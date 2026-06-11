// ========== MÓDULO DEL CHATBOT ==========
import { CONFIG } from '../core/config.js';
import { log, escapeHtml } from '../core/utils.js';

let knowledgeBase = [];
let chatbotInitialized = false;

export async function initChatbot() {
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');
    const chatbotFloat = document.getElementById('chatbotFloatBtn');
    const closeChat = document.getElementById('closeChatBtn');
    
    if (!chatbotWidget || !chatMessages) {
        log('Chatbot elements not found', 'warn');
        return;
    }
    
    // Evitar duplicación de mensajes de bienvenida
    if (chatbotInitialized) return;
    chatbotInitialized = true;
    
    // Limpiar mensajes existentes
    chatMessages.innerHTML = '';
    
    // Cargar FAQ desde archivo JSON
    async function loadFAQ() {
        try {
            const response = await fetch(CONFIG.FAQ_URL);
            if (!response.ok) throw new Error('Error al cargar FAQ');
            knowledgeBase = await response.json();
            log(`FAQ loaded: ${knowledgeBase.length} items`);
        } catch (error) {
            log(`Error loading FAQ: ${error}`, 'error');
            // Fallback SIN precios
            knowledgeBase = [
                { keywords: ["contacto", "whatsapp", "teléfono", "número"], response: "📞 Contáctanos al WhatsApp 3177366474. Respuesta en menos de 5 minutos." },
                { keywords: ["hoja de vida", "hv", "curriculum", "cv", "mejorar"], response: "📄 Te ayudamos a optimizar tu hoja de vida con IA. Escríbenos al WhatsApp 3177366474 para una revisión gratuita inicial." },
                { keywords: ["entrevista", "mock", "simulación", "preparación"], response: "🎯 Ofrecemos sesiones de entrevistas mock con feedback de reclutadores expertos. ¿Agendamos una sesión de prueba? Contáctanos por WhatsApp." },
                { keywords: ["outsourcing", "postular", "vacantes", "empleo", "trabajo"], response: "💼 Con nuestro Outsourcing Élite te postulamos a +50 vacantes estratégicas por mes. Escríbenos al 3177366474 para revisar tu perfil." }
            ];
        }
    }
    
    function getResponse(msg) {
        const lowerMsg = msg.toLowerCase();
        for (const item of knowledgeBase) {
            for (const keyword of item.keywords) {
                if (lowerMsg.includes(keyword.toLowerCase())) {
                    return item.response;
                }
            }
        }
        return "🐪 No entendí bien tu pregunta. Puedes preguntarme sobre: mejora de hoja de vida, preparación para entrevistas, outsourcing, horarios de atención o cómo contactarnos.";
    }
    
    function addMessage(text, isUser) {
        const div = document.createElement('div');
        div.className = `message ${isUser ? 'user' : 'bot'}`;
        div.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    async function sendMessage() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        
        addMessage(msg, true);
        chatInput.value = '';
        
        setTimeout(() => {
            const response = getResponse(msg);
            addMessage(response, false);
        }, 300);
    }
    
    // Event listeners
    sendBtn?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    chatbotFloat?.addEventListener('click', () => {
        chatbotWidget.classList.toggle('open');
    });
    
    closeChat?.addEventListener('click', () => {
        chatbotWidget.classList.remove('open');
    });
    
    // Botones rápidos
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            if (question) {
                chatInput.value = question;
                sendMessage();
            }
        });
    });
    
    // Cargar FAQ y mostrar mensaje de bienvenida
    await loadFAQ();
    addMessage("🐪 ¡Hola! Soy el asistente de Camellemos. ¿En qué puedo ayudarte? Puedo informarte sobre mejora de hoja de vida, preparación para entrevistas, outsourcing, horarios de atención y formas de contacto.", false);
    
    log('Chatbot module initialized');
}