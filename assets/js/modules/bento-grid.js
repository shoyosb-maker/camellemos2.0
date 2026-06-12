// ========== MÓDULO DE BENTO GRID (METODOLOGÍA) ==========
import { log } from '../core/utils.js';

export function initBentoGrid() {
    log('Inicializando Bento Grid...');
    
    const bentoCards = document.querySelectorAll('.bento-card');
    
    if (bentoCards.length > 0 && window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        
        bentoCards.forEach(card => observer.observe(card));
        log('✅ Bento Grid animations initialized');
    } else if (bentoCards.length > 0) {
        // Fallback si no hay IntersectionObserver
        bentoCards.forEach(card => card.classList.add('visible'));
    }
}