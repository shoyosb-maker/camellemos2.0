// ========== MÓDULO DE OFERTAS DE TRABAJO CON CARRUSEL ==========
import { log, escapeHtml } from '../core/utils.js';
import { sendWhatsApp } from './whatsapp.js';

const JOBS_DB = {
    tecnologia: [
        { title: "Ingeniero Software Senior / Senior Software Engineer", location: "Remoto" },
        { title: "Data Scientist / Científico de Datos", location: "Remoto" },
        { title: "Frontend React Developer / Desarrollador Frontend React", location: "Remoto" },
        { title: "Backend Node.js / Desarrollador Backend Node.js", location: "Remoto" },
        { title: "DevOps Engineer / Ingeniero DevOps", location: "Remoto" },
        { title: "Mobile Developer iOS / Desarrollador Móvil iOS", location: "Remoto" }
    ],
    marketing: [
        { title: "Growth Manager / Gerente de Crecimiento", location: "Remoto" },
        { title: "Social Media Strategist / Estratega de Redes Sociales", location: "Remoto" },
        { title: "Content Marketing Manager / Gerente de Marketing de Contenidos", location: "Remoto" },
        { title: "SEO Specialist / Especialista en SEO", location: "Remoto" }
    ],
    finanzas: [
        { title: "Financial Analyst / Analista Financiero", location: "Remoto" },
        { title: "Auditor Senior / Auditor Senior", location: "Remoto" },
        { title: "Tax Consultant / Consultor Fiscal", location: "Remoto" },
        { title: "Risk Manager / Gerente de Riesgos", location: "Remoto" }
    ]
};

export function initJobs() {
    log('Inicializando módulo de trabajos con carrusel...');
    
    function renderJobs(career) {
        const container = document.getElementById('jobsContainer');
        if (!container) {
            console.error('❌ Contenedor jobsContainer no encontrado');
            return;
        }
        
        const jobs = JOBS_DB[career];
        if (!jobs || jobs.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:30px;">No hay ofertas disponibles</div>';
            return;
        }
        
        let jobsHtml = '';
        jobs.forEach(job => {
            jobsHtml += `
                <div class="job-card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="job-title">${escapeHtml(job.title)}</div>
                        <span class="job-badge">✨ Nueva</span>
                    </div>
                    <div class="job-location">📍 ${escapeHtml(job.location)}</div>
                    <button class="btn-secondary" data-job="${escapeHtml(job.title)}">
                        📱 Aplicar vía WhatsApp
                    </button>
                </div>
            `;
        });
        
        const carruselHTML = `
            <div class="carrusel-container">
                <button class="carrusel-btn prev" id="carruselPrevBtn">❮</button>
                <div class="carrusel-wrapper" id="carruselWrapper">
                    <div class="carrusel-grid" id="carruselGrid">
                        ${jobsHtml}
                    </div>
                </div>
                <button class="carrusel-btn next" id="carruselNextBtn">❯</button>
                <div class="carrusel-indicators" id="carruselIndicators"></div>
            </div>
        `;
        
        container.innerHTML = carruselHTML;
        
        document.querySelectorAll('#carruselGrid .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const jobTitle = btn.getAttribute('data-job');
                sendWhatsApp(`🔥 Me interesa la oferta de ${jobTitle} (Remoto)`);
            });
        });
        
        initCarrusel();
        
        console.log(`✅ Renderizadas ${jobs.length} ofertas para: ${career}`);
    }
    
    function initCarrusel() {
        const wrapper = document.getElementById('carruselWrapper');
        const prevBtn = document.getElementById('carruselPrevBtn');
        const nextBtn = document.getElementById('carruselNextBtn');
        const indicatorsContainer = document.getElementById('carruselIndicators');
        
        if (!wrapper) return;
        
        function updateIndicators() {
            const cards = wrapper.querySelectorAll('.job-card');
            const scrollLeft = wrapper.scrollLeft;
            const cardWidth = cards[0]?.offsetWidth || 300;
            const gap = 24;
            const scrollAmount = cardWidth + gap;
            const activeIndex = Math.round(scrollLeft / scrollAmount);
            
            const dots = indicatorsContainer.querySelectorAll('.carrusel-dot');
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function createIndicators() {
            const cards = wrapper.querySelectorAll('.job-card');
            const totalDots = Math.ceil(cards.length / 3);
            let dotsHtml = '';
            for (let i = 0; i < totalDots; i++) {
                dotsHtml += `<button class="carrusel-dot ${i === 0 ? 'active' : ''}" data-dot-index="${i}"></button>`;
            }
            indicatorsContainer.innerHTML = dotsHtml;
            
            document.querySelectorAll('.carrusel-dot').forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    const cardWidth = cards[0]?.offsetWidth || 300;
                    const gap = 24;
                    const scrollAmount = cardWidth + gap;
                    wrapper.scrollTo({ left: scrollAmount * index, behavior: 'smooth' });
                    setTimeout(updateIndicators, 400);
                });
            });
        }
        
        function getScrollAmount() {
            const card = wrapper.querySelector('.job-card');
            if (!card) return 300;
            const cardWidth = card.offsetWidth;
            const gap = 24;
            return cardWidth + gap;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                wrapper.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
                setTimeout(updateIndicators, 400);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                wrapper.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
                setTimeout(updateIndicators, 400);
            });
        }
        
        wrapper.addEventListener('scroll', updateIndicators);
        createIndicators();
        setTimeout(updateIndicators, 100);
    }
    
    const careerBtns = document.querySelectorAll('.career-btn');
    console.log(`🔘 Botones encontrados: ${careerBtns.length}`);
    
    careerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const career = this.getAttribute('data-career');
            console.log(`🖱️ Click en categoría: ${career}`);
            
            careerBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderJobs(career);
        });
    });
    
    renderJobs('tecnologia');
    
    log('Jobs module initialized');
}