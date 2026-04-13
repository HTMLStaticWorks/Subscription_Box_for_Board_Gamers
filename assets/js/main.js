/**
 * LootTable - Main JavaScript
 * Handles Theme Toggling and RTL/LTR switching
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const rtlToggle = document.getElementById('rtlToggle');
    const html = document.documentElement;

    // --- Theme Toggle Logic ---
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (!icon) return;
        if (theme === 'light') {
            icon.classList.remove('bi-moon-stars');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-stars');
        }
    }

    // --- RTL Toggle Logic ---
    const savedDir = localStorage.getItem('dir') || 'ltr';
    html.setAttribute('dir', savedDir);
    updateRtlIcon(savedDir);

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

            html.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRtlIcon(newDir);
        });
    }

    function updateRtlIcon(dir) {
        if (!rtlToggle) return;
        const icon = rtlToggle.querySelector('i');
        if (!icon) return;
        icon.classList.remove('bi-text-left', 'bi-text-right');
        icon.classList.add('bi-arrow-left-right');
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
