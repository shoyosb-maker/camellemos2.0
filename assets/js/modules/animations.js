// ========== MÓDULO DE ANIMACIONES ==========
import { log } from '../core/utils.js';

export function initAnimations() {
    // Animaciones al scroll (Intersection Observer)
    const animatedElements = document.querySelectorAll('.service-card, .job-card, .pricing-card, .contact-box, .social-section');
    
    if (animatedElements.length > 0 && window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        animatedElements.forEach(el => observer.observe(el));
        log('Scroll animations initialized');
    }
    
    // Formas flotantes decorativas
    const shapes = ['●', '◆', '■', '▲', '♥'];
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.width = Math.random() * 60 + 30 + 'px';
        shape.style.height = shape.style.width;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 5 + 's';
        shape.style.animationDuration = Math.random() * 6 + 4 + 's';
        shape.style.background = `rgba(245, 158, 11, ${Math.random() * 0.08 + 0.02})`;
        document.body.appendChild(shape);
    }
    
    log('Animations module initialized');
}