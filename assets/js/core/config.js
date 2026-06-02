// ========== CONFIGURACIÓN GLOBAL ==========

export const CONFIG = {
    // WhatsApp
    WHATSAPP_NUMBER: "573177366474",
    DEFAULT_MESSAGE: "🐪 Hola! Quiero impulsar mi carrera con Camellemos",
    
    // URLs
    FAQ_URL: "data/faq.json",
    
    // Selectores CSS
    SELECTORS: {
        whatsappButtons: '[data-whatsapp]',
        chatbotButton: '#chatbotFloatBtn',
        chatbotWidget: '#chatbotWidget',
        closeChat: '#closeChatBtn',
        chatMessages: '#chatMessages',
        chatInput: '#chatInput',
        sendChatBtn: '#sendChatBtn',
        quickButtons: '.quick-btn',
        navLinks: '#navLinks',
        menuToggle: '#mobileMenuToggle',
        menuOverlay: '#menuOverlay',
        jobsContainer: '#jobsContainer',
        careerBtns: '.career-btn',
        premiumContainer: '#premiumMaterialsContainer'
    },
    
    // Clases CSS
    CLASSES: {
        active: 'active',
        visible: 'visible',
        scrolled: 'scrolled',
        open: 'open',
        user: 'user',
        bot: 'bot'
    },
    
    // IDs de páginas
    PAGES: ['inicio', 'trabajos', 'capacitacion', 'planes', 'contacto']
};