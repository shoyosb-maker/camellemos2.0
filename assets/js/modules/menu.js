// ========== MÓDULO DE MENÚ HAMBURGUESA Y SCROLL ==========
import { log } from '../core/utils.js';

export function initMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');
    
    // ========== FUNCIONES DEL MENÚ HAMBURGUESA ==========
    if (menuToggle && navLinks) {
        function closeMenu() {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        function openMenu() {
            navLinks.classList.add('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
        
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Cerrar menú al hacer clic en un botón (en móvil)
        const navButtons = document.querySelectorAll('.nav-links button');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }
    
    // ========== EFECTO STICKY AL HACER SCROLL ==========
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    log('Menu module initialized');
}