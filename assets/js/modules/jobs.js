// ========== MÓDULO DE OFERTAS DE TRABAJO CON CARRUSEL 3D ==========
import { log, escapeHtml } from '../core/utils.js';
import { sendWhatsApp } from './whatsapp.js';

let currentJobsData = [];
let currentIndex = 0;
let autoRotateInterval = null;
let carouselInitialized = false;

export async function initJobs() {
    log('Inicializando módulo de trabajos con carrusel 3D...');
    
    const container = document.getElementById('jobsContainer');
    if (!container) {
        log('❌ jobsContainer no encontrado', 'error');
        return;
    }
    
    // Mostrar loading
    container.innerHTML = `
        <div class="carousel-loading">
            <i class="fas fa-spinner"></i>
            <p>Cargando ofertas...</p>
        </div>
    `;
    
    // Cargar datos desde JSON
    await loadJobsData();
    
    // Configurar botones de categoría
    setupCategoryButtons();
    
    // Renderizar carrusel con categoría inicial (tecnologia)
    renderCarousel('tecnologia');
}

async function loadJobsData() {
    try {
        const response = await fetch('data/jobs.json');
        if (!response.ok) throw new Error('Error al cargar jobs.json');
        currentJobsData = await response.json();
        log(`✅ Jobs data loaded: ${Object.keys(currentJobsData).length} categories`);
    } catch (error) {
        log(`Error loading jobs.json: ${error}`, 'error');
        // Fallback con datos por defecto
        currentJobsData = {
            tecnologia: [{ title: "Ingeniero de Software Senior", location: "Remoto", description: "Oportunidad en empresa tech líder" }],
            marketing: [{ title: "Especialista SEO", location: "Remoto", description: "Únete al equipo de marketing digital" }],
            finanzas: [{ title: "Analista Financiero", location: "Remoto", description: "Importante empresa del sector" }]
        };
    }
}

function setupCategoryButtons() {
    const buttons = document.querySelectorAll('.career-btn-3d');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const career = btn.getAttribute('data-career');
            
            // Actualizar clase active
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Renderizar carrusel con la nueva categoría
            renderCarousel(career);
        });
    });
}

function renderCarousel(category) {
    const container = document.getElementById('jobsContainer');
    const jobs = currentJobsData[category];
    
    if (!jobs || jobs.length === 0) {
        container.innerHTML = `
            <div class="carousel-empty">
                <i class="fas fa-briefcase"></i>
                <p>No hay ofertas disponibles en esta categoría</p>
            </div>
        `;
        return;
    }
    
    // Detener auto-rotación anterior si existe
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
    }
    
    // Resetear índice
    currentIndex = 0;
    
    // Generar HTML del carrusel
    let cardsHtml = '';
    jobs.forEach((job, idx) => {
        let positionClass = '';
        if (idx === 0) positionClass = 'active';
        else if (idx === 1) positionClass = 'next';
        else if (idx === jobs.length - 1) positionClass = 'prev';
        else if (idx < currentIndex) positionClass = 'hidden-left';
        else positionClass = 'hidden-right';
        
        cardsHtml += `
            <div class="carousel-item ${positionClass}" data-index="${idx}">
                <div class="glass-card">
                    ${job.image ? `
                        <div class="job-image">
                            <img src="${escapeHtml(job.image)}" alt="${escapeHtml(job.title)}" loading="lazy">
                        </div>
                    ` : `
                        <div class="job-image" style="background: linear-gradient(135deg, #0B2B5E, #1E4A7A); display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-briefcase" style="font-size: 3rem; color: rgba(255,255,255,0.5);"></i>
                        </div>
                    `}
                    <span class="job-category-badge">${getCategoryIcon(category)} ${getCategoryName(category)}</span>
                    <h3 class="job-title">${escapeHtml(job.title)}</h3>
                    <div class="job-location">
                        <i class="fas fa-map-marker-alt"></i> ${escapeHtml(job.location)}
                    </div>
                    <p class="job-description">${escapeHtml(job.description || 'Excelente oportunidad profesional para crecer en tu carrera.')}</p>
                    <button class="glowing-btn" data-job="${escapeHtml(job.title)}">
                        📱 Aplicar vía WhatsApp
                    </button>
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
                    <button class="carousel-nav-btn" id="carouselPrevBtn3d">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="carousel-nav-btn" id="carouselNextBtn3d">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = carouselHTML;
    
    // Inicializar eventos del carrusel
    initCarouselEvents(jobs);
    
    // Agregar eventos a los botones de WhatsApp
    document.querySelectorAll('#carouselTrack3d .glowing-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const jobTitle = btn.getAttribute('data-job');
            sendWhatsApp(`🔥 Me interesa la oferta de ${jobTitle} (Remoto)`);
        });
    });
    
    // Iniciar auto-rotación
    startAutoRotate(jobs);
    
    log(`✅ Carrusel 3D renderizado con ${jobs.length} ofertas para: ${category}`);
}

function initCarouselEvents(jobs) {
    const items = document.querySelectorAll('#carouselTrack3d .carousel-item');
    const nextBtn = document.getElementById('carouselNextBtn3d');
    const prevBtn = document.getElementById('carouselPrevBtn3d');
    const carouselContainer = document.getElementById('carousel3d');
    
    if (!items.length || !nextBtn || !prevBtn) return;
    
    function updateCarousel() {
        items.forEach((item, i) => {
            // Reset clases
            item.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');
            
            if (i === currentIndex) {
                item.classList.add('active');
            } else if (i === (currentIndex + 1) % items.length) {
                item.classList.add('next');
            } else if (i === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add('prev');
            } else if (i < currentIndex) {
                item.classList.add('hidden-left');
            } else {
                item.classList.add('hidden-right');
            }
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
        resetAutoRotate(jobs);
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
        resetAutoRotate(jobs);
    });
    
    // Click en tarjeta para navegar a ella
    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
            resetAutoRotate(jobs);
        });
    });
    
    // Pausar auto-rotación al hover
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoRotate(jobs);
        });
    }
    
    updateCarousel();
}

function startAutoRotate(jobs) {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    
    autoRotateInterval = setInterval(() => {
        const items = document.querySelectorAll('#carouselTrack3d .carousel-item');
        if (items.length > 0) {
            currentIndex = (currentIndex + 1) % items.length;
            
            // Actualizar clases visuales
            items.forEach((item, i) => {
                item.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');
                if (i === currentIndex) {
                    item.classList.add('active');
                } else if (i === (currentIndex + 1) % items.length) {
                    item.classList.add('next');
                } else if (i === (currentIndex - 1 + items.length) % items.length) {
                    item.classList.add('prev');
                } else if (i < currentIndex) {
                    item.classList.add('hidden-left');
                } else {
                    item.classList.add('hidden-right');
                }
            });
        }
    }, 6000);
}

function resetAutoRotate(jobs) {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        startAutoRotate(jobs);
    }
}

function getCategoryIcon(category) {
    const icons = {
        tecnologia: '💻',
        marketing: '📊',
        finanzas: '💰'
    };
    return icons[category] || '🎯';
}

function getCategoryName(category) {
    const names = {
        tecnologia: 'Tecnología',
        marketing: 'Marketing',
        finanzas: 'Finanzas'
    };
    return names[category] || category;
}