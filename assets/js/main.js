// ========== MAIN.JS - CONTROLADOR PRINCIPAL ==========
// Este archivo importa e inicializa todos los módulos

import { log } from './core/utils.js';
import { initWhatsApp } from './modules/whatsapp.js';
import { initNavigation } from './modules/navigation.js';
import { initMenu, initBackToTop } from './modules/menu.js';
import { initSocial } from './modules/social.js';
import { initJobs } from './modules/jobs.js';
import { initAnimations } from './modules/animations.js';
// import { initChatbot } from './modules/chatbot.js';  // DESACTIVADO - Usamos KokobeoChat
import { initBentoGrid } from './modules/bento-grid.js';
import { initDarkMode } from './modules/dark-mode.js';
import { initScrollReveal } from './modules/scroll-reveal.js';

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    log('🚀 Camellemos iniciado');
    
    // Inicializar todos los módulos en orden
    initWhatsApp();      // WhatsApp primero
    initNavigation();    // Navegación entre páginas
    initMenu();          // Menú hamburguesa con animación
    initBackToTop();     // Botón volver arriba
    initSocial();        // Redes sociales
    initJobs();          // Ofertas de trabajo
    initAnimations();    // Animaciones decorativas
    // initChatbot();    // DESACTIVADO - Ahora usamos KokobeoChat
    initBentoGrid();     // Bento Grid de metodología
    initDarkMode();      // Dark Mode con transición suave
    initScrollReveal();  // Efecto fade on scroll
    
    log('✅ Todos los módulos inicializados correctamente');
});