// ========== MÓDULO DE NAVEGACIÓN ==========
import { log } from '../core/utils.js';

export function initNavigation() {
    const pages = ['inicio', 'trabajos', 'capacitacion', 'planes', 'contacto'];

    function showPage(pageId) {
        // Ocultar todas las páginas
        pages.forEach(id => {
            const el = document.getElementById(`page-${id}`);
            if (el) el.style.display = 'none';
        });

        // Mostrar la página seleccionada
        const selected = document.getElementById(`page-${pageId}`);
        if (selected) selected.style.display = 'block';

        // Scroll al inicio de la página al navegar (mejora UX en SPA)
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Actualizar clase activa en los botones del navbar
        const navButtonIds = ['navTrabajosBtn', 'navCapacitacionBtn', 'navPlanesBtn', 'navContactoBtn'];
        navButtonIds.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.classList.remove('active');
        });

        if (pageId !== 'inicio') {
            const activeBtn = document.getElementById(
                `nav${pageId.charAt(0).toUpperCase() + pageId.slice(1)}Btn`
            );
            if (activeBtn) activeBtn.classList.add('active');
        }

        log(`Page changed to: ${pageId}`);
    }

    // Botones del navbar
    const navButtons = {
        'navTrabajosBtn': 'trabajos',
        'navCapacitacionBtn': 'capacitacion',
        'navPlanesBtn': 'planes',
        'navContactoBtn': 'contacto',
    };

    Object.entries(navButtons).forEach(([btnId, pageId]) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.addEventListener('click', () => showPage(pageId));
    });

    // Botón de inicio desde el logo
    const inicioBtn = document.getElementById('navInicioBtn');
    if (inicioBtn) inicioBtn.addEventListener('click', () => showPage('inicio'));

    // Botón de inicio desde el menú móvil
    const inicioMenuBtn = document.getElementById('navInicioBtnMenu');
    if (inicioMenuBtn) inicioMenuBtn.addEventListener('click', () => showPage('inicio'));

    // Botones especiales
    const heroToJobs = document.getElementById('heroToJobsBtn');
    const capacitacionToPlanes = document.getElementById('capacitacionToPlanesBtn');
    if (heroToJobs) heroToJobs.addEventListener('click', () => showPage('trabajos'));
    if (capacitacionToPlanes) capacitacionToPlanes.addEventListener('click', () => showPage('planes'));

    // Footer links
    const footerLinks = {
        'footerInicioBtn': 'inicio',
        'footerTrabajosBtn': 'trabajos',
        'footerCapacitacionBtn': 'capacitacion',
        'footerPlanesBtn': 'planes',
        'footerContactoBtn': 'contacto',
    };

    Object.entries(footerLinks).forEach(([btnId, pageId]) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.addEventListener('click', () => showPage(pageId));
    });

    // Mostrar página de inicio al cargar
    showPage('inicio');

    log('Navigation module initialized');
}