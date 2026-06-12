// ========== MÓDULO DE MENÚ HAMBURGUESA Y BOTÓN VOLVER ARRIBA ==========
import { log } from '../core/utils.js';

export function initMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // ── Menú hamburguesa ─────────────────────────────────────────────────────

    if (menuToggle && navLinks) {
        function closeMenu() {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: navLinks,
                    opacity: [1, 0],
                    translateY: [0, -20],
                    duration: 200,
                    easing: 'easeOutQuad',
                    complete: () => {
                        navLinks.classList.remove('active');
                        navLinks.style.opacity = '';
                        navLinks.style.transform = '';
                    },
                });
            } else {
                navLinks.classList.remove('active');
            }
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        function openMenu() {
            navLinks.classList.add('active');
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-20px)';
            if (typeof anime !== 'undefined') {
                anime({
                    targets: navLinks,
                    opacity: [0, 1],
                    translateY: [-20, 0],
                    duration: 300,
                    easing: 'easeOutQuad',
                });
            } else {
                navLinks.style.opacity = '1';
                navLinks.style.transform = 'translateY(0)';
            }
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Cerrar menú al hacer clic en un enlace (en móvil)
        document.querySelectorAll('.nav-links button').forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.innerWidth <= 768) closeMenu();
            });
        });

        // Cerrar menú al redimensionar a desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    // ── Scroll unificado con passive: true y throttle ───────────────────────
    // Un único listener maneja tanto el sticky navbar como el botón volver arriba.
    // Esto es más eficiente que dos listeners separados.
    let scrollThrottleId = null;

    function onScroll() {
        if (scrollThrottleId) return;
        scrollThrottleId = requestAnimationFrame(() => {
            const y = window.scrollY;

            // Sticky navbar
            if (navbar) navbar.classList.toggle('scrolled', y > 50);

            // Botón volver arriba
            if (backToTopBtn) {
                const shouldShow = y > 300;
                const isShown = backToTopBtn.classList.contains('show');

                if (shouldShow && !isShown) {
                    backToTopBtn.classList.add('show');
                    if (typeof anime !== 'undefined' && !backToTopBtn.hasAttribute('data-animated')) {
                        backToTopBtn.setAttribute('data-animated', 'true');
                        anime({ targets: backToTopBtn, scale: [0, 1], duration: 300, easing: 'easeOutQuad' });
                    }
                } else if (!shouldShow && isShown) {
                    backToTopBtn.classList.remove('show');
                    backToTopBtn.removeAttribute('data-animated');
                }
            }

            scrollThrottleId = null;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    log('Menu module initialized with animations');
}

// ========== BOTÓN VOLVER ARRIBA ==========
export function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    // El listener de scroll está centralizado en initMenu.
    // Aquí solo configuramos el comportamiento al hacer clic.
    backToTopBtn.addEventListener('click', () => {
        if (typeof anime !== 'undefined') {
            const start = window.scrollY;
            const duration = 500;
            const startTime = performance.now();

            function animateScroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                window.scrollTo(0, start * (1 - easeProgress));
                if (progress < 1) requestAnimationFrame(animateScroll);
            }
            requestAnimationFrame(animateScroll);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    log('Back to top button initialized');
}