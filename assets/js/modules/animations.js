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
    
    // Hojas cayendo - ELIMINADO
    // function createLeaf() {
    //     const leaf = document.createElement('div');
    //     leaf.className = 'leaf';
    //     const leafs = ['🍂', '🍃', '🌿', '🍁', '🌾'];
    //     leaf.innerHTML = leafs[Math.floor(Math.random() * leafs.length)];
    //     leaf.style.left = Math.random() * 100 + '%';
    //     leaf.style.animationDuration = Math.random() * 5 + 4 + 's';
    //     leaf.style.animationDelay = Math.random() * 5 + 's';
    //     leaf.style.fontSize = Math.random() * 10 + 15 + 'px';
    //     leaf.style.opacity = Math.random() * 0.4 + 0.3;
    //     document.body.appendChild(leaf);
    //     setTimeout(() => leaf.remove(), 10000);
    // }

    // Iniciar hojas - ELIMINADO
    // if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    //     setInterval(createLeaf, 2000);
    //     log('Leaf animation started');
    // }
    
    // Formas flotantes decorativas (se mantienen)
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