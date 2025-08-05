// Espera todo o HTML da página ser carregado antes de executar qualquer script
document.addEventListener('DOMContentLoaded', function () {

    // --- TEMA (LIGHT/DARK) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        // Função para aplicar o tema salvo no localStorage
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                body.classList.add('light-theme');
            } else {
                body.classList.remove('light-theme');
            }
        };
        applySavedTheme();

        // Evento de clique para trocar o tema
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('light-theme');
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- NAVBAR ATIVA (ACTIVE LINK ON SCROLL) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const onScroll = () => {
            const scrollPosition = window.scrollY + 150;
            sections.forEach(section => {
                if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${section.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };
        window.addEventListener('scroll', onScroll);
    }

    // --- MODAL DE DETALHES (POP-UP "VER MAIS") ---
    const modalOverlay = document.getElementById('details-modal');
    if (modalOverlay) {
        const modalBody = document.getElementById('modal-body');
        const closeBtn = modalOverlay.querySelector('.modal-close-btn');
        const openButtons = document.querySelectorAll('.btn-ver-mais');

        if (closeBtn && openButtons.length > 0) {
            const openModal = (cardContent) => {
                if (!cardContent) return;
                modalBody.innerHTML = '';
                const title = cardContent.querySelector('.job-title').innerHTML;
                const company = cardContent.querySelector('.company').innerHTML;
                const period = cardContent.querySelector('.period').innerHTML;
                const descriptionItems = cardContent.querySelectorAll('.job-description li');

                let descriptionHTML = '<ul class="job-description">';
                descriptionItems.forEach(item => {
                    descriptionHTML += `<li>${item.innerHTML}</li>`;
                });
                descriptionHTML += '</ul>';

                const contentHTML = `
                    <h3 class="job-title">${title}</h3>
                    <h4 class="company">${company}</h4>
                    <p class="period">${period}</p>
                    ${descriptionHTML}`;

                modalBody.innerHTML = contentHTML;
                modalOverlay.classList.add('active');
            };

            const closeModal = () => {
                modalOverlay.classList.remove('active');
            };

            openButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const cardContent = button.closest('.timeline-content');
                    openModal(cardContent);
                });
            });

            closeBtn.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (event) => {
                if (event.target === modalOverlay) {
                    closeModal();
                }
            });
        }
    }

    // --- ANIMAÇÃO DE ENTRADA AO ROLAR (INTERSECTION OBSERVER) ---
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-item');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- SMOOTH SCROLL PARA O INDICADOR DA HERO SECTION ---
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('#experience').scrollIntoView({ behavior: 'smooth' });
        });
    }

}); // FIM DO DOMCONTENTLOADED


// --- EFEITO PARALLAX (PODE FICAR FORA, POIS USA 'WINDOW') ---
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.1; // Diminuí o efeito para ficar mais sutil
        hero.style.transform = `translateY(${rate}px)`;
    }
});
