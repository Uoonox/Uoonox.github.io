function toggleDarkMode() {
    document.body.classList.add('dark-mode-transition');
    document.body.classList.toggle('dark-mode');
    let darkModeOn = document.body.classList.contains('dark-mode');
    document.getElementById('darkModeToggle').textContent = darkModeOn ? '🌙' : '☀️';
    localStorage.setItem('darkMode', darkModeOn);
}

window.addEventListener('load', () => {
    let darkModePref = localStorage.getItem('darkMode') === 'true';
    document.body.classList.add('dark-mode-transition');
    if (darkModePref) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').textContent = '🌙';
    }
});

document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
