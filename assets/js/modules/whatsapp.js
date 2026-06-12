// ========== MÓDULO DE WHATSAPP ==========
import { CONFIG } from '../core/config.js';
import { log } from '../core/utils.js';

let sendWhatsAppFunction;

export function initWhatsApp() {
    sendWhatsAppFunction = (msg = CONFIG.DEFAULT_MESSAGE) => {
        const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        log(`WhatsApp: ${msg.substring(0, 50)}...`);
    };

    // Exponer globalmente para los botones flip del HTML (onclick="window.sendWhatsAppApp(...)")
    // Esto elimina la necesidad del <script> inline al final del HTML.
    window.sendWhatsAppApp = sendWhatsAppFunction;

    // Botones con atributo data-whatsapp
    const buttons = document.querySelectorAll('[data-whatsapp]');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sendWhatsAppFunction();
        });
    });

    // Botones específicos con IDs
    const heroBtn = document.getElementById('heroWhatsappBtn');
    const contactBtn = document.getElementById('contactWhatsappBtn');
    const floatBtn = document.getElementById('whatsappFloatBtn');

    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sendWhatsAppFunction();
        });
    }
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sendWhatsAppFunction();
        });
    }
    if (floatBtn) {
        floatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sendWhatsAppFunction();
        });
    }

    log('WhatsApp module initialized');
}

export function sendWhatsApp(msg) {
    if (sendWhatsAppFunction) {
        sendWhatsAppFunction(msg);
    }
}