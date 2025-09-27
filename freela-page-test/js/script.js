// ===== VARIABLES ===== 
// Para minificação: remover comentários, espaços e quebras de linha desnecessárias
const header = document.getElementById('header'),
      navLinks = document.querySelectorAll('.nav__link'),
      sections = document.querySelectorAll('section[id]'),
      backToTop = document.getElementById('back-to-top'),
      portfolioFilters = document.querySelectorAll('.portfolio__filter'),
      portfolioItems = document.querySelectorAll('.portfolio__item'),
      contactForm = document.getElementById('contact-form'),
      modal = document.getElementById('portfolio-modal');

// Flag para evitar execução dupla em dispositivos touch
let isToggling = false;

// ===== MOBILE MENU (NOVO) =====
const mobileMenu = document.getElementById('mobile-menu');
const mobileToggle = document.getElementById('nav-toggle');
const mobileClose = document.getElementById('mobile-close');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

// Abrir menu mobile
function openMobileMenu() {
    console.log('Opening mobile menu...');
    if (mobileMenu) {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Mobile menu opened');
    }
}

// Fechar menu mobile
function closeMobileMenu() {
    console.log('Closing mobile menu...');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('Mobile menu closed');
    }
}

// Event listeners para o menu mobile
if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Mobile toggle clicked');
        openMobileMenu();
    });
}

if (mobileClose) {
    mobileClose.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Mobile close clicked');
        closeMobileMenu();
    });
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
        console.log('Overlay clicked');
        closeMobileMenu();
    });
}

// Fechar menu ao clicar nos links
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('Mobile link clicked');
        closeMobileMenu();
    });
});

// Fechar menu com tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ===== MOBILE MENU - RESPONSIVE HANDLERS =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 968 && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.innerWidth > 968 && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 100);
});

// ===== HEADER SCROLL =====
function scrollHeader() {
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// ===== SHOW SCROLL UP =====
function scrollUp() {
    if (this.scrollY >= 560) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}
window.addEventListener('scroll', scrollUp);

// ===== BACK TO TOP =====
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ACTIVE LINK SCROLL =====
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ===== PORTFOLIO FILTERS =====
portfolioFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        portfolioFilters.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked filter
        filter.classList.add('active');
        
        // Get filter value
        const filterValue = filter.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== PORTFOLIO MODAL =====
const portfolioData = {
    project1: {
        title: 'Site Empresarial Moderno',
        category: 'Website Institucional',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        description: `
            <p>Desenvolvimento completo de site institucional para empresa do segmento corporativo, com foco em apresentação profissional e conversão de leads.</p>
            
            <h4>Características do Projeto:</h4>
            <ul>
                <li>Design responsivo e moderno</li>
                <li>Otimização para mecanismos de busca (SEO)</li>
                <li>Integração com Google Analytics</li>
                <li>Formulários de contato inteligentes</li>
                <li>Painel administrativo para gestão de conteúdo</li>
                <li>Carregamento ultra-rápido</li>
            </ul>
            
            <h4>Resultados Alcançados:</h4>
            <ul>
                <li>Aumento de 300% no número de leads</li>
                <li>Tempo de carregamento inferior a 2 segundos</li>
                <li>100% responsivo em todos os dispositivos</li>
                <li>Posicionamento no topo do Google para palavras-chave estratégicas</li>
            </ul>
        `,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'WordPress'],
        whatsappText: 'Quero%20um%20site%20empresarial%20moderno%20como%20o%20que%20vi%20no%20portfólio'
    },
    project2: {
        title: 'Landing Page de Alto Desempenho',
        category: 'Página de Conversão',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
        description: `
            <p>Landing page desenvolvida especificamente para campanha de marketing digital, com foco total em conversão e vendas online.</p>
            
            <h4>Características do Projeto:</h4>
            <ul>
                <li>Design persuasivo e focado em conversão</li>
                <li>Testes A/B integrados</li>
                <li>Formulários otimizados</li>
                <li>Integração com ferramentas de marketing</li>
                <li>Analytics avançados e relatórios detalhados</li>
                <li>Carregamento instantâneo</li>
            </ul>
            
            <h4>Resultados Alcançados:</h4>
            <ul>
                <li>Taxa de conversão de 15.8%</li>
                <li>Redução de 60% no custo por lead</li>
                <li>ROI de 400% em campanhas de tráfego pago</li>
                <li>Mais de 1000 conversões no primeiro mês</li>
            </ul>
        `,
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Analytics', 'Hotjar'],
        whatsappText: 'Preciso%20de%20uma%20landing%20page%20de%20alta%20conversão%20como%20essa'
    },
    project3: {
        title: 'Sistema de Gestão Empresarial',
        category: 'Dashboard Administrativo',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
        description: `
            <p>Sistema web completo para gestão empresarial, incluindo controle de vendas, estoque, financeiro e relatórios gerenciais.</p>
            
            <h4>Características do Projeto:</h4>
            <ul>
                <li>Dashboard intuitivo com métricas em tempo real</li>
                <li>Gestão completa de vendas e clientes</li>
                <li>Controle de estoque automatizado</li>
                <li>Módulo financeiro com fluxo de caixa</li>
                <li>Relatórios personalizáveis</li>
                <li>Sistema de permissões por usuário</li>
                <li>Backup automático e segurança avançada</li>
            </ul>
            
            <h4>Resultados Alcançados:</h4>
            <ul>
                <li>Redução de 70% no tempo de processos manuais</li>
                <li>Aumento de 40% na produtividade da equipe</li>
                <li>Controle total sobre métricas de negócio</li>
                <li>ROI positivo em 3 meses</li>
            </ul>
        `,
        technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Chart.js'],
        whatsappText: 'Quero%20desenvolver%20um%20sistema%20de%20gestão%20para%20minha%20empresa'
    },
    project4: {
        title: 'App de Delivery Inovador',
        category: 'Aplicativo Mobile',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
        description: `
            <p>Aplicativo mobile completo para delivery, conectando restaurantes, entregadores e clientes em uma plataforma única e eficiente.</p>
            
            <h4>Características do Projeto:</h4>
            <ul>
                <li>App nativo para Android e iOS</li>
                <li>Sistema de geolocalização em tempo real</li>
                <li>Pagamento integrado (PIX, cartão, dinheiro)</li>
                <li>Chat em tempo real entre usuários</li>
                <li>Sistema de avaliações e comentários</li>
                <li>Painel administrativo web</li>
                <li>Notificações push personalizadas</li>
            </ul>
            
            <h4>Resultados Alcançados:</h4>
            <ul>
                <li>Mais de 10.000 downloads nos primeiros 6 meses</li>
                <li>Taxa de retenção de usuários de 85%</li>
                <li>Avaliação 4.8 estrelas nas lojas de apps</li>
                <li>Processamento de mais de 500 pedidos diários</li>
            </ul>
        `,
        technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB', 'Socket.io', 'Maps API'],
        whatsappText: 'Tenho%20interesse%20em%20desenvolver%20um%20aplicativo%20como%20esse'
    },
    project5: {
        title: 'E-commerce de Alta Performance',
        category: 'Loja Virtual',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
        description: `
            <p>Loja virtual completa com todas as funcionalidades necessárias para vender online, incluindo integração com gateways de pagamento e logística.</p>
            
            <h4>Características do Projeto:</h4>
            <ul>
                <li>Design responsivo e otimizado para conversão</li>
                <li>Carrinho de compras inteligente</li>
                <li>Integração com múltiplos meios de pagamento</li>
                <li>Gestão completa de produtos e categorias</li>
                <li>Sistema de cupons e promoções</li>
                <li>Relatórios de vendas e analytics</li>
                <li>SEO otimizado para produtos</li>
            </ul>
            
            <h4>Resultados Alcançados:</h4>
            <ul>
                <li>Aumento de 250% nas vendas online</li>
                <li>Taxa de conversão de 8.5%</li>
                <li>Redução de 40% no abandono de carrinho</li>
                <li>Ticket médio 30% maior que a média do setor</li>
            </ul>
        `,
        technologies: ['WooCommerce', 'WordPress', 'PHP', 'MySQL', 'JavaScript', 'Payment APIs'],
        whatsappText: 'Quero%20criar%20minha%20loja%20virtual%20profissional'
    },
    project6: {
        title: 'Landing Page para Área Médica',
        category: 'Área da Saúde',
        image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=400&fit=crop',
        description: `
            <p>Landing page especializada para profissionais da área médica, com foco em agendamento de consultas e conversão de pacientes.</p>
            
            <h4>Características do Projeto:</h4>
            <ul>
                <li>Design clean e profissional</li>
                <li>Formulário de agendamento integrado</li>
                <li>Seção de depoimentos de pacientes</li>
                <li>Informações sobre tratamentos e especialidades</li>
                <li>Integração com WhatsApp Business</li>
                <li>Certificados e credenciais em destaque</li>
                <li>Otimização para buscas locais</li>
            </ul>
            
            <h4>Resultados Alcançados:</h4>
            <ul>
                <li>Aumento de 180% em agendamentos online</li>
                <li>Redução de 50% no tempo de atendimento telefônico</li>
                <li>Posicionamento no topo para busca local</li>
                <li>Taxa de conversão de 12% visitante para agendamento</li>
            </ul>
        `,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap', 'Google Business'],
        whatsappText: 'Preciso%20de%20uma%20landing%20page%20para%20área%20médica'
    }
};

function openModal(projectId) {
    const project = portfolioData[projectId];
    if (!project) return;

    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-category').textContent = project.category;
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-image').alt = project.title;
    document.getElementById('modal-description').innerHTML = project.description;
    
    // Technologies
    const techContainer = document.getElementById('modal-technologies');
    techContainer.innerHTML = `
        <h4>Tecnologias Utilizadas:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
            ${project.technologies.map(tech => 
                `<span style="background: #f7fafc; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.875rem; font-weight: 500;">${tech}</span>`
            ).join('')}
        </div>
    `;
    
    // WhatsApp link
    document.getElementById('modal-whatsapp').href = `https://wa.me/5517997317085?text=${project.whatsappText}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== CONTACT FORM =====
if (contactForm) {
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll('.form__input');
    const nameInput = contactForm.querySelector('#name');
    const phoneInput = contactForm.querySelector('#phone');
    const messageInput = contactForm.querySelector('#message');
    const charCount = document.getElementById('char-count');
    const counterElement = messageInput ? messageInput.parentElement.querySelector('.form__counter') : null;
    
    formInputs.forEach(input => {
        // Validation on blur
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        // Clear validation on focus
        input.addEventListener('focus', () => {
            clearFieldValidation(input);
        });
        
        // Handle select change for label animation
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', () => {
                const label = input.nextElementSibling;
                if (input.value && label) {
                    label.style.transform = 'translateY(-1.5rem) scale(0.8)';
                    label.style.color = '#667eea';
                }
            });
        }
    });
    
    // ===== NAME FORMATTING =====
    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            let value = e.target.value;
            
            // Remove números e caracteres especiais, mantém apenas letras e espaços
            value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
            
            // Capitaliza primeira letra de cada palavra
            value = value.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
            
            // Remove espaços duplos
            value = value.replace(/\s+/g, ' ');
            
            e.target.value = value;
        });
        
        // Permite colagem, mas limpa o conteúdo após colar
        nameInput.addEventListener('paste', (e) => {
            // Permite a colagem normal, mas processamos depois
            setTimeout(() => {
                let value = nameInput.value;
                // Remove números e caracteres especiais, mantém apenas letras e espaços
                value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
                // Capitaliza primeira letra de cada palavra
                value = value.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
                // Remove espaços duplos
                value = value.replace(/\s+/g, ' ');
                nameInput.value = value;
            }, 0);
        });
    }
    
    // ===== PHONE MASK =====
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
            
            // Limita a 11 dígitos (2 DDD + 9 número)
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Aplica máscara brasileira baseada no modelo (17) 99731-7085
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 7) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
            
            // Limita o comprimento final ao formato exato: (17) 99731-7085 = 15 caracteres
            if (value.length > 15) {
                value = value.substring(0, 15);
            }
            
            e.target.value = value;
        });
        
        // Previne entrada de mais caracteres quando atingir o limite
        phoneInput.addEventListener('keypress', (e) => {
            const char = String.fromCharCode(e.which);
            const currentValue = e.target.value;
            
            // Bloqueia se não for número e já tiver atingido o formato completo
            if (!/[\d]/.test(char) || currentValue.length >= 15) {
                e.preventDefault();
                return;
            }
        });
        
        // Permite colagem, mas formata o conteúdo após colar
        phoneInput.addEventListener('paste', (e) => {
            // Permite a colagem normal, mas processamos depois
            setTimeout(() => {
                let value = phoneInput.value.replace(/\D/g, ''); // Remove tudo que não é número
                
                // Limita a 11 dígitos (2 DDD + 9 número)
                if (value.length > 11) {
                    value = value.substring(0, 11);
                }
                
                // Aplica máscara brasileira baseada no modelo (17) 99731-7085
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 7) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
                
                phoneInput.value = value;
            }, 0);
        });
    }
    
    // ===== CHARACTER COUNTER =====
    if (messageInput && charCount && counterElement) {
        messageInput.addEventListener('input', (e) => {
            const currentLength = e.target.value.length;
            const maxLength = 500;
            
            charCount.textContent = currentLength;
            
            // Remove classes anteriores
            counterElement.classList.remove('warning', 'danger');
            
            // Adiciona classes baseadas no limite
            if (currentLength >= maxLength * 0.9) { // 90% do limite
                counterElement.classList.add('danger');
            } else if (currentLength >= maxLength * 0.7) { // 70% do limite
                counterElement.classList.add('warning');
            }
            
            // Atualiza o limite visual
            if (currentLength >= maxLength) {
                e.target.value = e.target.value.substring(0, maxLength);
                charCount.textContent = maxLength;
                counterElement.classList.add('danger');
            }
        });
    }
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Por favor, corrija os erros no formulário.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('btn--loading');
        submitBtn.disabled = true;
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Create WhatsApp message
        let whatsappMessage = `Olá! Meu nome é ${name} e gostaria de solicitar um orçamento.\n\n`;
        whatsappMessage += `📱 Meu WhatsApp: ${phone}\n`;
        whatsappMessage += `🎯 Serviço de interesse: ${getServiceName(service)}\n`;
        
        if (message) {
            whatsappMessage += `📝 Descrição do projeto:\n${message}\n`;
        }
        
        whatsappMessage += `\nPor favor, me envie mais informações e um orçamento personalizado!`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Simulate delay for better UX
        setTimeout(() => {
            // Open WhatsApp
            window.open(`https://wa.me/5517997317085?text=${encodedMessage}`, '_blank');
            
            // Reset form and loading state
            contactForm.reset();
            submitBtn.classList.remove('btn--loading');
            submitBtn.disabled = false;
            
            // Reset all labels and counters
            formInputs.forEach(input => {
                const label = input.nextElementSibling;
                if (label && label.classList.contains('form__label')) {
                    label.style.transform = '';
                    label.style.color = '';
                }
                clearFieldValidation(input);
            });
            
            // Reset character counter
            if (charCount && counterElement) {
                charCount.textContent = '0';
                counterElement.classList.remove('warning', 'danger');
            }
            
            // Show success message
            showNotification('Redirecionando para o WhatsApp...', 'success');
        }, 1000);
    });
}

// Form validation functions
function validateField(field) {
    const group = field.closest('.form__group');
    const value = field.value.trim();
    
    // Remove previous error
    clearFieldValidation(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(group, 'Este campo é obrigatório');
        return false;
    }
    
    // Specific field validations
    switch (field.type) {
        case 'text':
            if (field.name === 'name') {
                if (value.length < 2) {
                    showFieldError(group, 'Nome deve ter pelo menos 2 caracteres');
                    return false;
                }
                // Verifica se contém apenas letras e espaços
                if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                    showFieldError(group, 'Nome deve conter apenas letras');
                    return false;
                }
            }
            break;
            
        case 'tel':
            // Remove caracteres de máscara para validação
            const cleanPhone = value.replace(/\D/g, '');
            if (value && cleanPhone.length !== 11) {
                showFieldError(group, 'WhatsApp deve ter 11 dígitos (DDD + número)');
                return false;
            }
            // Verifica formato exato da máscara (17) 99731-7085
            const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
            if (value && !phoneRegex.test(value)) {
                showFieldError(group, 'Formato: (17) 99999-9999');
                return false;
            }
            // Verifica se tem exatamente 15 caracteres
            if (value && value.length !== 15) {
                showFieldError(group, 'Formato completo: (17) 99999-9999');
                return false;
            }
            break;
    }
    
    // Validação específica para textarea
    if (field.tagName === 'TEXTAREA' && field.name === 'message') {
        if (value.length > 500) {
            showFieldError(group, 'Descrição deve ter no máximo 500 caracteres');
            return false;
        }
    }
    
    // Success state
    group.classList.add('success');
    return true;
}

function showFieldError(group, message) {
    group.classList.add('error');
    group.classList.remove('success');
    
    let errorElement = group.querySelector('.form__error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'form__error';
        group.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldValidation(field) {
    const group = field.closest('.form__group');
    group.classList.remove('error', 'success');
    
    const errorElement = group.querySelector('.form__error');
    if (errorElement) {
        errorElement.remove();
    }
}

function getServiceName(service) {
    const services = {
        'site': 'Site Profissional',
        'landing': 'Landing Page',
        'sistema': 'Sistema Web',
        'app': 'Aplicativo',
        'outro': 'Outro serviço'
    };
    return services[service] || service;
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 3000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification--success {
                border-left: 4px solid #48bb78;
            }
            .notification--info {
                border-left: 4px solid #667eea;
            }
            .notification__content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: #1a202c;
                font-weight: 500;
            }
            .notification__content i {
                color: inherit;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ANIMATION ON SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll functions
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollUp);
window.removeEventListener('scroll', scrollActive);

window.addEventListener('scroll', debounce(scrollHeader, 10));
window.addEventListener('scroll', debounce(scrollUp, 10));
window.addEventListener('scroll', debounce(scrollActive, 10));

// ===== INITIALIZE AOS =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// ===== NAVBAR INITIALIZATION =====
let navbarInitialized = false;

function initializeNavbar() {
    if (navbarInitialized) {
        console.log('Navbar already initialized, skipping...');
        return;
    }
    
    console.log('Initializing navbar...');
    
    // Ensure all elements exist
    if (!mobileMenu || !mobileToggle || !mobileClose) {
        console.warn('Mobile menu elements not found. Retrying in 100ms...');
        setTimeout(initializeNavbar, 100);
        return;
    }
    
    // Force close menu on load
    closeMobileMenu();
    
    // Debug logging for mobile issues
    console.log('Mobile menu elements found:', {
        mobileMenu: !!mobileMenu,
        mobileToggle: !!mobileToggle,
        mobileClose: !!mobileClose,
        mobileToggleDisplay: mobileToggle ? window.getComputedStyle(mobileToggle).display : 'not found',
        mobileMenuClasses: mobileMenu ? mobileMenu.className : 'not found',
        mobileToggleRect: mobileToggle ? mobileToggle.getBoundingClientRect() : 'not found'
    });
    
    // Mark as initialized
    navbarInitialized = true;
    
    console.log('Navbar initialization completed');
}

// ===== DYNAMIC AOS LOADING =====
function loadAOS() {
    // Load AOS CSS
    const aosCSS = document.createElement('link');
    aosCSS.rel = 'stylesheet';
    aosCSS.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    document.head.appendChild(aosCSS);
    
    // Load AOS JS
    const aosScript = document.createElement('script');
    aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    aosScript.onload = () => {
        // Initialize AOS after loading
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }
    };
    document.head.appendChild(aosScript);
}

// ===== COOKIE BANNER =====
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');

// Check if user has already accepted cookies
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    
    if (!consent) {
        setTimeout(() => {
            showCookieBanner();
        }, 1500); // Show after 1.5 seconds
    }
}

// Show cookie banner
function showCookieBanner() {
    if (cookieBanner) {
        cookieBanner.classList.add('show');
    }
}

// Hide cookie banner
function hideCookieBanner() {
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 300);
    }
}

// Accept cookies
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    hideCookieBanner();
    
    // Enable tracking scripts here if needed
    console.log('Cookies aceitos - tracking habilitado');
}

// Event listeners for cookie banner
if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', acceptCookies);
}

// Function to reset cookie consent (useful for testing)
window.resetCookieConsent = function() {
    localStorage.removeItem('cookieConsent');
    location.reload();
};

// ===== PRIVACY POLICY MODAL =====
function openPrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('privacy-modal');
    if (modal && e.target === modal) {
        closePrivacyModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePrivacyModal();
    }
});

// ===== PAGE LOAD OPTIMIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize navbar with delay to ensure all CSS is loaded
    setTimeout(initializeNavbar, 50);
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Load AOS after critical content loads
    setTimeout(loadAOS, 100);
    
    // Check and show cookie banner if needed
    checkCookieConsent();
    
    // Initialize any additional features
    console.log('%c🚀 Realiza Sites - Website carregado com sucesso!', 'color: #25d366; font-weight: bold; font-size: 14px;');
    
    // Track page view (you can integrate with Google Analytics here)
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'Realiza Sites - Home',
            page_location: window.location.href
        });
    }
    
    // Force reflow to ensure proper rendering
    document.body.offsetHeight;
});

// ===== BACKUP INITIALIZATION =====
// Fallback initialization for slower connections
window.addEventListener('load', () => {
    // Remove duplicated navbar initialization - already handled in DOMContentLoaded
    console.log('Window loaded - navbar already initialized');
});

// ===== DEBUGGING UTILITIES =====
window.RS_Debug = {
    checkMobileMenu: () => {
        console.log('=== MOBILE MENU DEBUG ===');
        console.log('Elements:', {
            mobileMenu: !!mobileMenu,
            mobileToggle: !!mobileToggle,
            mobileClose: !!mobileClose,
            mobileOverlay: !!mobileOverlay,
            menuActive: mobileMenu ? mobileMenu.classList.contains('active') : false,
            windowWidth: window.innerWidth
        });
        
        if (mobileMenu) {
            console.log('Mobile Menu details:', {
                classes: mobileMenu.className,
                styles: {
                    opacity: window.getComputedStyle(mobileMenu).opacity,
                    visibility: window.getComputedStyle(mobileMenu).visibility,
                    zIndex: window.getComputedStyle(mobileMenu).zIndex
                },
                boundingRect: mobileMenu.getBoundingClientRect()
            });
        }
        
        if (mobileToggle) {
            console.log('Mobile Toggle details:', {
                display: window.getComputedStyle(mobileToggle).display,
                visibility: window.getComputedStyle(mobileToggle).visibility,
                position: mobileToggle.getBoundingClientRect()
            });
        }
        
        console.log('=================');
    },
    openMenu: openMobileMenu,
    closeMenu: closeMobileMenu,
    testToggle: () => {
        console.log('Testing mobile toggle manually...');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
};

// ===== SERVICE WORKER REGISTRATION =====
// Service Worker registration removed - sw.js file not available

// ===== LAZY LOADING =====
// Intersection Observer for lazy loading images
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
                img.src = src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                observer.unobserve(img);
                
                // Trigger AOS animation after image loads
                img.addEventListener('load', () => {
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                });
            }
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.01
});

// Initialize lazy loading
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });
}

// ===== UTILITY FUNCTIONS =====
// Format phone number
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Get viewport dimensions
function getViewport() {
    return {
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.RS = {
    openModal,
    closeModal,
    showNotification,
    formatPhone,
    validateEmail,
    getViewport
};
