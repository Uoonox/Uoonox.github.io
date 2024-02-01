function toggleDarkMode() {
    document.body.classList.add('dark-mode-transition');
    document.body.classList.toggle('dark-mode');
    let darkModeOn = document.body.classList.contains('dark-mode');
    document.getElementById('darkModeToggle').textContent = darkModeOn ? '🌙' : '☀️';
    localStorage.setItem('darkMode', darkModeOn);
}

function applyInitialThemeSetting() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkModeStoredPref = localStorage.getItem('darkMode');
    const useDarkMode = darkModeStoredPref === null ? prefersDarkMode : (darkModeStoredPref === 'true');

    document.body.classList.add('dark-mode-transition');
    if (useDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').textContent = '🌙';
    }
}

window.addEventListener('load', applyInitialThemeSetting);
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
