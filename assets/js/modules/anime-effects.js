// ========== ANIME.JS EFFECTS - VERSIÓN SIMPLIFICADA ==========
// Solo efectos básicos que no interfieren

import { log } from '../core/utils.js';

export function initAnimeEffects() {
    // Verificar si Anime.js está disponible
    if (typeof anime === 'undefined') {
        log('Anime.js no disponible', 'warn');
        return false;
    }
    
    log('🎬 Anime.js disponible - efectos básicos');
    
    // Solo un efecto sutil en botones (opcional, no molesta)
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn,
                scale: 1.02,
                translateY: -2,
                duration: 150,
                easing: 'easeOutQuad'
            });
        });
        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                translateY: 0,
                duration: 120,
                easing: 'easeOutQuad'
            });
        });
    });
    
    return true;
}