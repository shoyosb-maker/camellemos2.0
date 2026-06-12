// ========== MÓDULO DE OFERTAS DE TRABAJO CON CARRUSEL 3D Y SOPORTE TÁCTIL ==========
import { log, escapeHtml } from '../core/utils.js';
import { sendWhatsApp } from './whatsapp.js';

// ── Estado encapsulado del carrusel ──────────────────────────────────────────
// En vez de 5 variables sueltas a nivel de módulo, usamos un único objeto.
// Esto evita desincronización cuando renderCarousel se llama varias veces.
const carouselState = {
    jobsData: {},
    currentIndex: 0,
    autoRotateInterval: null,
    touchStartX: 0,
    touchEndX: 0,
};

export async function initJobs() {
    log('Inicializando módulo de trabajos con carrusel 3D y soporte táctil...');

    const container = document.getElementById('jobsContainer');
    if (!container) {
        log('❌ jobsContainer no encontrado', 'error');
        return;
    }

    container.innerHTML = `
        <div class="carousel-loading">
            <i class="fas fa-spinner"></i>
            <p>Cargando ofertas...</p>
        </div>
    `;

    await loadJobsData();
    setupCategoryButtons();
    renderCarousel('tecnologia-it');
}

async function loadJobsData() {
    try {
        const response = await fetch('data/jobs.json');
        if (!response.ok) throw new Error('Error al cargar jobs.json');
        carouselState.jobsData = await response.json();
        log(`✅ Jobs data loaded: ${Object.keys(carouselState.jobsData).length} categories`);
    } catch (error) {
        log(`Error loading jobs.json: ${error}`, 'error');
        carouselState.jobsData = {
            "tecnologia-it": [{ title: "Full Stack Developer", location: "Remoto", description: "Oportunidad en empresa tech líder" }],
            "marketing": [{ title: "Especialista SEO", location: "Remoto", description: "Únete al equipo de marketing digital" }],
            "comercial": [{ title: "Sales Executive", location: "Remoto", description: "Oportunidad comercial" }],
            "finanzas": [{ title: "Analista Financiero", location: "Remoto", description: "Importante empresa del sector" }],
            "administracion": [{ title: "Administrador", location: "Remoto", description: "Gestión administrativa" }],
            "redes-sociales": [{ title: "Community Manager", location: "Remoto", description: "Gestión de redes sociales" }],
        };
    }
}

function setupCategoryButtons() {
    const buttons = document.querySelectorAll('.career-btn-3d');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const career = btn.getAttribute('data-career');
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCarousel(career);
        });
    });
}

function renderCarousel(category) {
    const container = document.getElementById('jobsContainer');
    const jobs = carouselState.jobsData[category];

    if (!jobs || jobs.length === 0) {
        container.innerHTML = `<div class="carousel-empty"><i class="fas fa-briefcase"></i><p>No hay ofertas disponibles en esta categoría</p></div>`;
        return;
    }

    // Cancelar auto-rotate anterior de forma segura antes de reasignar
    stopAutoRotate();
    carouselState.currentIndex = 0;

    let cardsHtml = '';
    jobs.forEach((job, idx) => {
        let positionClass = 'hidden-right';
        if (idx === 0) positionClass = 'active';
        else if (idx === 1) positionClass = 'next';
        else if (idx === jobs.length - 1) positionClass = 'prev';

        cardsHtml += `
            <div class="carousel-item ${positionClass}" data-index="${idx}">
                <div class="glass-card">
                    ${job.image
                        ? `<div class="job-image"><img src="${escapeHtml(job.image)}" alt="${escapeHtml(job.title)}" loading="lazy"></div>`
                        : `<div class="job-image" style="background: linear-gradient(135deg, #0B2B5E, #1E4A7A); display: flex; align-items: center; justify-content: center;"><i class="fas fa-briefcase" style="font-size: 3rem; color: rgba(255,255,255,0.5);"></i></div>`
                    }
                    <span class="job-category-badge">${getCategoryIcon(category)} ${getCategoryName(category)}</span>
                    <h3 class="job-title">${escapeHtml(job.title)}</h3>
                    <div class="job-location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(job.location)}</div>
                    <p class="job-description">${escapeHtml(job.description || 'Excelente oportunidad profesional para crecer en tu carrera.')}</p>
                    <button class="glowing-btn" type="button" data-job="${escapeHtml(job.title)}">📱 Aplicar vía WhatsApp</button>
                </div>
            </div>
        `;
    });

    const carouselHTML = `
        <div class="carousel-wrapper-3d">
            <div class="carousel-container" id="carousel3d">
                <div class="carousel-track" id="carouselTrack3d">
                    ${cardsHtml}
                </div>
                <div class="carousel-nav-controls">
                    <button class="carousel-nav-btn" id="carouselPrevBtn3d" type="button" aria-label="Oferta anterior"><i class="fas fa-chevron-left"></i></button>
                    <button class="carousel-nav-btn" id="carouselNextBtn3d" type="button" aria-label="Siguiente oferta"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = carouselHTML;
    initCarouselEvents(jobs);

    document.querySelectorAll('#carouselTrack3d .glowing-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const jobTitle = btn.getAttribute('data-job');
            sendWhatsApp(`🔥 Me interesa la oferta de ${jobTitle} (Remoto)`);
        });
    });

    startAutoRotate(jobs);
    log(`✅ Carrusel 3D renderizado con ${jobs.length} ofertas para: ${category}`);
}

// ── Función compartida de actualización de clases ────────────────────────────
// Antes existía duplicada en initCarouselEvents y en startAutoRotate.
// Ahora ambas llaman a esta única implementación.
function updateCarouselClasses(items) {
    const len = items.length;
    items.forEach((item, i) => {
        item.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');
        if (i === carouselState.currentIndex) {
            item.classList.add('active');
        } else if (i === (carouselState.currentIndex + 1) % len) {
            item.classList.add('next');
        } else if (i === (carouselState.currentIndex - 1 + len) % len) {
            item.classList.add('prev');
        } else if (i < carouselState.currentIndex) {
            item.classList.add('hidden-left');
        } else {
            item.classList.add('hidden-right');
        }
    });
}

function initCarouselEvents(jobs) {
    const items = document.querySelectorAll('#carouselTrack3d .carousel-item');
    const nextBtn = document.getElementById('carouselNextBtn3d');
    const prevBtn = document.getElementById('carouselPrevBtn3d');
    const carouselContainer = document.getElementById('carousel3d');
    if (!items.length || !nextBtn || !prevBtn) return;

    function nextSlide() {
        carouselState.currentIndex = (carouselState.currentIndex + 1) % items.length;
        updateCarouselClasses(items);
        resetAutoRotate(jobs);
    }

    function prevSlide() {
        carouselState.currentIndex = (carouselState.currentIndex - 1 + items.length) % items.length;
        updateCarouselClasses(items);
        resetAutoRotate(jobs);
    }

    // Botones de navegación
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });

    // Swipe táctil
    carouselContainer.addEventListener('touchstart', (e) => {
        carouselState.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', (e) => {
        carouselState.touchEndX = e.changedTouches[0].screenX;
        const deltaX = carouselState.touchEndX - carouselState.touchStartX;
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) prevSlide();
            else nextSlide();
        }
    }, { passive: true });

    // Click en tarjeta
    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            carouselState.currentIndex = i;
            updateCarouselClasses(items);
            resetAutoRotate(jobs);
        });
    });

    // Pausar auto-rotación al interactuar con el mouse
    carouselContainer.addEventListener('mouseenter', stopAutoRotate);
    carouselContainer.addEventListener('mouseleave', () => startAutoRotate(jobs));

    updateCarouselClasses(items);
}

// ── Auto-rotate ──────────────────────────────────────────────────────────────

function stopAutoRotate() {
    if (carouselState.autoRotateInterval) {
        clearInterval(carouselState.autoRotateInterval);
        carouselState.autoRotateInterval = null;
    }
}

function startAutoRotate(jobs) {
    stopAutoRotate(); // Garantiza que nunca haya dos intervalos activos
    carouselState.autoRotateInterval = setInterval(() => {
        const items = document.querySelectorAll('#carouselTrack3d .carousel-item');
        if (items.length) {
            carouselState.currentIndex = (carouselState.currentIndex + 1) % items.length;
            updateCarouselClasses(items); // Reutiliza la función compartida
        }
    }, 6000);
}

function resetAutoRotate(jobs) {
    stopAutoRotate();
    startAutoRotate(jobs);
}

// ── Helpers de categoría ─────────────────────────────────────────────────────

function getCategoryIcon(category) {
    const icons = {
        'tecnologia-it': '💻',
        'marketing': '📊',
        'comercial': '🤝',
        'finanzas': '💰',
        'administracion': '📋',
        'redes-sociales': '📱',
    };
    return icons[category] || '🎯';
}

function getCategoryName(category) {
    const names = {
        'tecnologia-it': 'Tecnología IT',
        'marketing': 'Marketing',
        'comercial': 'Comercial',
        'finanzas': 'Finanzas',
        'administracion': 'Administración',
        'redes-sociales': 'Redes Sociales',
    };
    return names[category] || category;
}