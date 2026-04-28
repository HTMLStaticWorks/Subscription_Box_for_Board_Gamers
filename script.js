// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (themeToggle) {
        updateThemeIcon(themeToggle, newTheme === 'dark');
    }
}

function updateThemeIcon(btn, isDark) {
    const icon = btn.querySelector('i');
    if (icon) {
        icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        lucide.createIcons();
    }
}

// RTL Management
function toggleRTL() {
    const isRTL = document.documentElement.dir === 'rtl';
    const newDir = isRTL ? 'ltr' : 'rtl';
    document.documentElement.dir = newDir;
    localStorage.setItem('rtl', newDir);
}

// Mobile Menu Management
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', mobileMenu.classList.contains('active') ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
    }
}

// Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('active');
        }
    });
}

// Modal Management
function openModal(id) {
    const modal = document.getElementById(id);
    const overlay = document.querySelector('.modal-overlay');
    if (modal && overlay) {
        overlay.style.display = 'flex';
        modal.classList.add('active');
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.querySelector('.modal-overlay');
    overlay.style.display = 'none';
    modals.forEach(m => m.classList.remove('active'));
}

// Initialize
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const rtlToggle = document.getElementById('rtl-toggle');
    const mobileRtlToggle = document.getElementById('mobile-rtl-toggle');

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        updateThemeIcon(themeToggle, savedTheme === 'dark');
    }

    // Set initial RTL
    const savedRTL = localStorage.getItem('rtl') || 'ltr';
    document.documentElement.dir = savedRTL;

    // Listeners
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (rtlToggle) rtlToggle.addEventListener('click', toggleRTL);
    if (mobileRtlToggle) mobileRtlToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleRTL();
    });

    initMobileMenu();
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Run once on load

    // Lucide Icons
    lucide.createIcons();
});

// Close modal on overlay click
document.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) closeModal();
});
