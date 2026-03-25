document.addEventListener('DOMContentLoaded', () => {
    /* ==========================
       THEME & RTL MANAGEMENT
       ========================== */
    const themeBtn = document.getElementById('themeToggle');
    const rtlBtn = document.getElementById('rtlToggle');
    const htmlEl = document.documentElement;

    // Initialize Theme
    const savedTheme = localStorage.getItem('boardgame_theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Initialize RTL
    const savedDir = localStorage.getItem('boardgame_dir') || 'ltr';
    htmlEl.setAttribute('dir', savedDir);
    updateRTLIcon(savedDir);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('boardgame_theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentDir = htmlEl.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            htmlEl.setAttribute('dir', newDir);
            localStorage.setItem('boardgame_dir', newDir);
            updateRTLIcon(newDir);
            
            // Re-trigger animations on layout flip
            triggerMicroInteractions();
        });
    }

    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        if (theme === 'light') {
            icon.classList.remove('bi-moon-stars');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-stars');
        }
    }

    function updateRTLIcon(dir) {
        if (!rtlBtn) return;
        const icon = rtlBtn.querySelector('i');
        if (dir === 'rtl') {
            icon.classList.remove('bi-text-left');
            icon.classList.add('bi-text-right');
        } else {
            icon.classList.remove('bi-text-right');
            icon.classList.add('bi-text-left');
        }
    }

    /* ==========================
       ANTI-GRAVITY PARTICLES
       ========================== */
    const particleContainer = document.querySelector('.hero-bg-particles');
    if (particleContainer) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            createParticle(particleContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 8 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100 + 100; // Start below the screen
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);

        // Remove and recreate feeling
        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, (duration + delay) * 1000);
    }

    /* ==========================
       MAGNETIC HOVER EFFECT
       ========================== */
    const magneticElements = document.querySelectorAll('.btn-premium');
    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Muted effect for non-desktop
            if (window.innerWidth > 991) {
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            }
        });

        btn.addEventListener('mouseleave', () => {
             btn.style.transform = '';
             btn.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        btn.addEventListener('mouseenter', () => {
             btn.style.transition = 'none'; // remove transition for smooth mouse follow
        });
    });

    /* ==========================
       SCROLL REVEAL (Intersection Observer)
       ========================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: keep it visible after trigger, unobserve
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(card);
        
        // Ensure reveal works
        card.addEventListener('transitionend', function handler(e) {
            if (card.classList.contains('is-visible')) {
                // Return control to CSS :hover effects
                card.style.transition = '';
                card.style.opacity = '1';
                card.style.transform = '';
                card.removeEventListener('transitionend', handler);
            }
        });
    });

    // Handle reveals
    document.addEventListener('scroll', () => {
        glassCards.forEach(card => {
            if(card.classList.contains('is-visible') && card.style.opacity === '0'){
                 card.style.opacity = '1';
                 card.style.transform = 'translateY(0)';
            }
        });
    });


    function triggerMicroInteractions() {
        // Quick visual refresh pulse on RTL/LTR toggle
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.classList.remove('anti-gravity');
            void card.offsetWidth; // trigger reflow
            card.classList.add('anti-gravity');
        });
    }
});
