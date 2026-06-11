// ========== MÓDULO DE DARK MODE ==========
import { log } from '../core/utils.js';

export function initDarkMode() {
    const darkModeFloatBtn = document.getElementById('darkModeFloatBtn');
    
    if (!darkModeFloatBtn) {
        log('Dark mode float button not found', 'warn');
        return;
    }
    
    // Función para activar/desactivar dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Cambiar el ícono del botón flotante
        const isDarkMode = document.body.classList.contains('dark-mode');
        const icon = isDarkMode ? 'fa-sun' : 'fa-moon';
        
        const iconElement = darkModeFloatBtn.querySelector('i');
        if (iconElement) {
            iconElement.className = `fas ${icon}`;
        }
        
        log(`Dark mode ${isDarkMode ? 'activado' : 'desactivado'}`);
    }
    
    // Event listener
    darkModeFloatBtn.addEventListener('click', toggleDarkMode);
    
    log('Dark mode module initialized (floating button)');
}