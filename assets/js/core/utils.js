// ========== FUNCIONES UTILITARIAS ==========

export function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

export function log(message, type = 'log') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console[type](`[Camellemos] ${message}`);
    }
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function isMobile() {
    return window.innerWidth <= 768;
}