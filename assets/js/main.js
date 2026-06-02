// ========== MAIN.JS - CONTROLADOR PRINCIPAL ==========
// Este archivo importa e inicializa todos los módulos

import { log } from './core/utils.js';
import { initWhatsApp } from './modules/whatsapp.js';
import { initNavigation } from './modules/navigation.js';
import { initMenu } from './modules/menu.js';
import { initSocial } from './modules/social.js';
import { initJobs } from './modules/jobs.js';
import { initAnimations } from './modules/animations.js';
import { initChatbot } from './modules/chatbot.js';

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    log('🚀 Camellemos iniciado');
    
    // Inicializar todos los módulos en orden
    initWhatsApp();      // WhatsApp primero (para que esté disponible)
    initNavigation();    // Navegación entre páginas
    initMenu();          // Menú hamburguesa
    initSocial();        // Redes sociales
    initJobs();          // Ofertas de trabajo
    initAnimations();    // Animaciones decorativas
    initChatbot();       // Chatbot (depende de FAQ.json)
    
    log('✅ Todos los módulos inicializados correctamente');
});