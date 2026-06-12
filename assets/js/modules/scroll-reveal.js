// ========== SCROLL REVEAL - EFECTO SEDA ==========
// Los elementos aparecen con una transición ultra suave (como seda)

import { log } from '../core/utils.js';

export function initScrollReveal() {
    if (typeof anime === 'undefined') {
        log('Scroll reveal: Anime.js no disponible', 'warn');
        return false;
    }
    
    log('📜 Inicializando efecto seda en scroll');
    
    // Elementos que tendrán el efecto
    const elements = [
        '.bento-card',
        '.service-card-container',
        '.career-btn-3d',
        '.pricing-card',
        '.contact-box',
        '.social-section',
        '.hero-stats-badge'
    ];
    
    const items = document.querySelectorAll(elements.join(','));
    
    if (!items.length) {
        log('Scroll reveal: No se encontraron elementos', 'warn');
        return false;
    }
    
    // Estado inicial - completamente ocultos
    items.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'none';
    });
    
    // Efecto seda - aparece suavemente al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animación ultra suave (efecto seda)
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [40, 0],
                    duration: 1200,        // 1.2 segundos - muy suave
                    delay: 50,             // mínima pausa
                    easing: 'easeOutCubic', // la curva más suave que existe
                    begin: function() {
                        // Pequeño efecto de "anticipation" antes de aparecer
                        entry.target.style.willChange = 'opacity, transform';
                    },
                    complete: function() {
                        entry.target.style.willChange = 'auto';
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.05,               // Se activa cuando solo el 5% es visible
        rootMargin: '0px 0px -30px 0px' // Aparece un poco antes
    });
    
    // Observar todos los elementos
    items.forEach(el => observer.observe(el));
    
    log(`✅ Efecto seda aplicado a ${items.length} elementos`);
    return true;
}