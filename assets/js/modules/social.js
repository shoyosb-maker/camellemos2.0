// ========== MÓDULO DE REDES SOCIALES ==========
import { log } from '../core/utils.js';

export function initSocial() {
    const SOCIAL = {
        tiktok: "https://www.tiktok.com/@camellemoswork",
        instagram: "https://www.instagram.com/camellemosnegocios/",
        facebook: "https://www.facebook.com/profile.php?id=61590235423918",
        twitter: "https://x.com/camellemoswork"
    };
    
    // Social icons en la sección de contacto
    const socialIds = ['socialTiktok', 'socialInstagram', 'socialFacebook', 'socialTwitter'];
    socialIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const platform = id.replace('social', '').toLowerCase();
            el.setAttribute('href', SOCIAL[platform] || '#');
        }
    });
    
    // Footer social icons
    const footerIds = ['footerTiktok', 'footerInstagram', 'footerFacebook', 'footerTwitter'];
    footerIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const platform = id.replace('footer', '').toLowerCase();
            el.setAttribute('href', SOCIAL[platform] || '#');
        }
    });
    
    log('Social module initialized');
}