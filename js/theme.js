const THEMES = ['cinema', 'ocean', 'forest', 'sunset'];

function resolveTheme(value) {
    return THEMES.includes(value) ? value : 'cinema';
}

function applyTheme(theme) {
    const safeTheme = resolveTheme(theme);
    document.documentElement.setAttribute('data-theme', safeTheme);
}

function getStoredTheme() {
    try {
        return resolveTheme(localStorage.getItem('theme'));
    } catch (e) {
        return 'cinema';
    }
}

function setTheme(theme) {
    const safeTheme = resolveTheme(theme);
    try {
        localStorage.setItem('theme', safeTheme);
    } catch (e) {
        // ignore storage errors
    }
    applyTheme(safeTheme);
}

function bindThemeSelector() {
    const select = document.getElementById('themeSelect');
    if (!select) return;
    const current = getStoredTheme();
    select.value = current;
    select.addEventListener('change', (e) => {
        setTheme(e.target.value);
    });
}

const initialTheme = getStoredTheme();
applyTheme(initialTheme);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindThemeSelector);
} else {
    bindThemeSelector();
}

window.setTheme = setTheme;
window.getCurrentTheme = () => getStoredTheme();
