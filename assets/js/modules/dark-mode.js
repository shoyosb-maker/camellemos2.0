// ========== MÓDULO DE DARK MODE CON ANIMACIÓN ==========
import { log } from '../core/utils.js';

export function initDarkMode() {
    const darkModeFloatBtn = document.getElementById('darkModeFloatBtn');
    
    if (!darkModeFloatBtn) {
        log('Dark mode float button not found', 'warn');
        return;
    }
    
    // Cargar preferencia guardada
    const savedMode = localStorage.getItem('camellemos-dark-mode');
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = darkModeFloatBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-sun';
    }
    
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const icon = darkModeFloatBtn.querySelector('i');
        
        // Cambiar ícono inmediatamente
        const newIcon = !isDarkMode ? 'fa-sun' : 'fa-moon';
        if (icon) icon.className = `fas ${newIcon}`;
        
        // Usar Anime.js para transición suave si está disponible
        if (typeof anime !== 'undefined') {
            // Animación del ícono
            anime({
                targets: icon,
                rotate: [0, 360],
                duration: 500,
                easing: 'easeOutCubic'
            });
            
            // Transición del fondo
            anime({
                targets: document.body,
                duration: 400,
                easing: 'easeOutQuad',
                update: function(anim) {
                    // Cambiar clase en medio de la animación
                    if (anim.progress >= 50 && document.body.classList.contains('dark-mode') === isDarkMode) {
                        document.body.classList.toggle('dark-mode');
                    }
                },
                complete: () => {
                    if (document.body.classList.contains('dark-mode') === isDarkMode) {
                        document.body.classList.toggle('dark-mode');
                    }
                    localStorage.setItem('camellemos-dark-mode', 
                        document.body.classList.contains('dark-mode') ? 'dark' : 'light');
                }
            });
        } else {
            // Fallback sin Anime.js
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('camellemos-dark-mode', 
                document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        }
        
        log(`Dark mode ${!isDarkMode ? 'activado' : 'desactivado'}`);
    }
    
    darkModeFloatBtn.addEventListener('click', toggleDarkMode);
    log('Dark mode module initialized with animations');
}