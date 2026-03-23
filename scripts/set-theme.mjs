import fs from 'fs';
import path from 'path';

const THEMES = ['cinema', 'ocean', 'forest', 'sunset'];
const theme = process.argv[2];

if (!theme || !THEMES.includes(theme)) {
  console.error('Usage: node scripts/set-theme.mjs <cinema|ocean|forest|sunset>');
  process.exit(1);
}

const root = process.cwd();
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html'));

if (htmlFiles.length === 0) {
  console.error('No html files found in project root.');
  process.exit(1);
}

const htmlTagRegex = /<html\b[^>]*>/i;
const dataThemeRegex = /data-theme\s*=\s*"[^"]*"/i;

htmlFiles.forEach((file) => {
  const fullPath = path.join(root, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const match = content.match(htmlTagRegex);
  if (!match) return;

  const htmlTag = match[0];
  let updatedTag;

  if (dataThemeRegex.test(htmlTag)) {
    updatedTag = htmlTag.replace(dataThemeRegex, `data-theme="${theme}"`);
  } else {
    updatedTag = htmlTag.replace('<html', `<html data-theme="${theme}"`);
  }

  if (updatedTag !== htmlTag) {
    const updated = content.replace(htmlTag, updatedTag);
    fs.writeFileSync(fullPath, updated, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log(`Active theme: ${theme}`);
