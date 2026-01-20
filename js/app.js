/* ============================================
   LocalForge Dashboard - Main Application
   ============================================ */

// App State
const AppState = {
    currentPage: 'dashboard',
    user: {
        name: 'Usuário Demo',
        email: 'usuario@email.com',
        plan: 'free',
        stats: {
            searches: 12,
            demos: 5,
            messages: 8
        }
    },
    selectedBusiness: null,
    demoData: null,
    messageType: null
};

// Mock Data
const MockData = {
    businesses: [
        {
            id: 1,
            name: 'Pizzaria Bella Napoli',
            category: 'Restaurante',
            rating: 4.5,
            icon: 'fa-utensils',
            city: 'São Paulo'
        },
        {
            id: 2,
            name: 'Academia FitPro',
            category: 'Academia',
            rating: 4.2,
            icon: 'fa-dumbbell',
            city: 'São Paulo'
        },
        {
            id: 3,
            name: 'Clínica Odontológica Sorriso',
            category: 'Clínica',
            rating: 4.8,
            icon: 'fa-stethoscope',
            city: 'São Paulo'
        },
        {
            id: 4,
            name: 'Salão Beauty Hair',
            category: 'Salão de Beleza',
            rating: 4.3,
            icon: 'fa-cut',
            city: 'São Paulo'
        },
        {
            id: 5,
            name: 'Pet Shop Amigo Fiel',
            category: 'Pet Shop',
            rating: 4.6,
            icon: 'fa-paw',
            city: 'São Paulo'
        },
        {
            id: 6,
            name: 'Imobiliária Casa Nova',
            category: 'Imobiliária',
            rating: 4.1,
            icon: 'fa-home',
            city: 'São Paulo'
        },
        {
            id: 7,
            name: 'Oficina Auto Center',
            category: 'Oficina Mecânica',
            rating: 4.4,
            icon: 'fa-car',
            city: 'São Paulo'
        },
        {
            id: 8,
            name: 'Escola de Inglês FastLearn',
            category: 'Escola',
            rating: 4.7,
            icon: 'fa-graduation-cap',
            city: 'São Paulo'
        }
    ],
    messages: {
        inicial: `Olá! 👋

Vi que a {negocio} atua no segmento de {nicho} e percebi uma grande oportunidade para vocês se destacarem ainda mais no digital.

Trabalho ajudando empresas locais a aumentarem sua visibilidade online e conquistarem mais clientes através de soluções digitais personalizadas.

Posso mostrar algumas estratégias específicas para o seu negócio? Seria uma conversa rápida de 15 minutos.

Fico no aguardo!`,
        servico: `Olá!

Gostaria de apresentar nosso serviço de {tipo_servico} que pode transformar a presença digital do seu negócio.

✅ {beneficio1}
✅ {beneficio2}
✅ {beneficio3}

Investimento: {preco}

Posso preparar uma demonstração personalizada para você ver na prática como ficaria? Sem compromisso!`,
        resposta: `Olá!

Obrigado por entrar em contato! Fico feliz com seu interesse.

{resposta_personalizada}

Podemos agendar uma conversa para eu entender melhor suas necessidades e apresentar a melhor solução?

Quando seria um bom horário para você?

Aguardo seu retorno!`
    }
};

// App Instance
const app = {
    // Initialize
    init() {
        this.setupEventListeners();
        this.router.init();
        this.loadPage('dashboard');
    },

    // Setup Event Listeners
    setupEventListeners() {
        // Sidebar Toggle (Mobile)
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const sidebarClose = document.getElementById('sidebar-close');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleSidebar());
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        }

        if (sidebarClose) {
            sidebarClose.addEventListener('click', () => this.closeSidebar());
        }

        // Dropdown Toggle
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('active');
            });

            document.addEventListener('click', () => {
                dropdownMenu.classList.remove('active');
            });
        }

        // Navigation Links
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('[data-page]');
            if (navLink) {
                e.preventDefault();
                const page = navLink.dataset.page;
                this.loadPage(page);
                this.closeSidebar();
            }

            // Back Button
            const backBtn = e.target.closest('[data-back]');
            if (backBtn) {
                e.preventDefault();
                const page = backBtn.dataset.back;
                this.loadPage(page);
            }
        });

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Logout realizado!', 'Até logo!', 'info');
            });
        }
    },

    // Toggle Sidebar
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    },

    // Close Sidebar
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    },

    // Router
    router: {
        init() {
            window.addEventListener('hashchange', () => {
                const page = location.hash.slice(1) || 'dashboard';
                app.loadPage(page);
            });
        }
    },

    // Load Page
    loadPage(pageName) {
        const mainContent = document.getElementById('main-content');
        const template = document.getElementById(`page-${pageName}`);

        if (template) {
            mainContent.innerHTML = '';
            const content = template.content.cloneNode(true);
            mainContent.appendChild(content);

            // Update active nav
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === pageName) {
                    link.classList.add('active');
                }
            });

            // Update URL hash
            if (location.hash !== `#${pageName}`) {
                history.pushState(null, '', `#${pageName}`);
            }

            AppState.currentPage = pageName;

            // Initialize page-specific functionality
            this.initPageFunctions(pageName);
        }
    },

    // Initialize Page Functions
    initPageFunctions(pageName) {
        switch (pageName) {
            case 'encontrar-negocios':
                this.initSearchPage();
                break;
            case 'criar-demonstracao':
                this.initDemoWizard();
                break;
            case 'mensagens':
                this.initMessagesPage();
                break;
            case 'historico':
                this.initHistoricoPage();
                break;
            case 'planos':
                this.initPlanosPage();
                break;
            case 'configuracoes':
                this.initConfigPage();
                break;
        }
    },

    // ============================================
    // SEARCH PAGE
    // ============================================
    initSearchPage() {
        const form = document.getElementById('search-business-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        }
    },

    performSearch() {
        const cidade = document.getElementById('cidade').value;
        const nicho = document.getElementById('nicho').value;
        const resultsContainer = document.getElementById('search-results');
        const businessGrid = resultsContainer.querySelector('.business-grid');

        // Show loading
        businessGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Buscando negócios...</div>';
        resultsContainer.classList.remove('hidden');

        // Simulate API call
        setTimeout(() => {
            this.renderBusinessCards(businessGrid);
            this.showToast('Busca concluída!', `${MockData.businesses.length} negócios encontrados em ${cidade}`, 'success');
        }, 1500);
    },

    renderBusinessCards(container) {
        container.innerHTML = MockData.businesses.map(business => `
            <div class="business-card">
                <div class="business-card-header">
                    <div class="business-icon">
                        <i class="fas ${business.icon}"></i>
                    </div>
                    <div class="business-card-info">
                        <h4>${business.name}</h4>
                        <span class="business-category">${business.category}</span>
                    </div>
                </div>
                <div class="business-rating">
                    ${this.renderStars(business.rating)}
                    <span>${business.rating}</span>
                </div>
                <button class="btn btn-primary" onclick="app.analyzeBusiness(${business.id})">
                    <i class="fas fa-chart-line"></i> Analisar
                </button>
            </div>
        `).join('');
    },

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    },

    analyzeBusiness(businessId) {
        const business = MockData.businesses.find(b => b.id === businessId);
        if (business) {
            AppState.selectedBusiness = business;
            this.loadPage('analise');
            
            // Update analysis page with business data
            setTimeout(() => {
                document.getElementById('analise-business-name').textContent = business.name;
                document.getElementById('analise-category').textContent = business.category;
                document.getElementById('analise-rating').textContent = business.rating;
            }, 100);
        }
    },

    // ============================================
    // DEMO WIZARD
    // ============================================
    initDemoWizard() {
        const form = document.getElementById('demo-form');
        const prevBtn = form.querySelector('.wizard-prev');
        const nextBtn = form.querySelector('.wizard-next');
        const submitBtn = form.querySelector('.wizard-submit');
        let currentStep = 1;
        const totalSteps = 3;

        // Step Navigation
        const updateWizard = () => {
            // Update step indicators
            document.querySelectorAll('.wizard-step').forEach((step, index) => {
                step.classList.remove('active', 'completed');
                if (index + 1 < currentStep) {
                    step.classList.add('completed');
                } else if (index + 1 === currentStep) {
                    step.classList.add('active');
                }
            });

            // Update content
            document.querySelectorAll('.wizard-content').forEach((content, index) => {
                content.classList.remove('active');
                if (index + 1 === currentStep) {
                    content.classList.add('active');
                }
            });

            // Update buttons
            prevBtn.disabled = currentStep === 1;
            
            if (currentStep === totalSteps) {
                nextBtn.classList.add('hidden');
                submitBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                submitBtn.classList.add('hidden');
            }
        };

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateWizard();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateWizard();
            }
        });

        // Form Submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateDemo();
        });

        // Upload Area
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-upload');
        const uploadPreview = document.getElementById('upload-preview');

        if (uploadArea) {
            uploadArea.addEventListener('click', () => fileInput.click());
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--secondary)';
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = '#E5E7EB';
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#E5E7EB';
                const files = e.dataTransfer.files;
                this.handleFileUpload(files, uploadPreview);
            });

            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files, uploadPreview);
            });
        }
    },

    handleFileUpload(files, previewContainer) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const div = document.createElement('div');
                    div.className = 'upload-preview-item';
                    div.innerHTML = `
                        <img src="${e.target.result}" alt="${file.name}">
                        <button type="button" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
                    `;
                    previewContainer.appendChild(div);
                };
                reader.readAsDataURL(file);
            }
        });
    },

    generateDemo() {
        const formData = new FormData(document.getElementById('demo-form'));
        const data = Object.fromEntries(formData);
        
        AppState.demoData = data;
        
        this.showToast('Gerando demonstração...', 'Aguarde um momento', 'info');
        
        setTimeout(() => {
            this.loadPage('resultado');
            this.showToast('Demonstração gerada!', 'Seu prompt está pronto', 'success');
        }, 2000);
    },

    // ============================================
    // RESULTADO PAGE
    // ============================================
    copyPrompt() {
        const promptOutput = document.getElementById('prompt-output');
        navigator.clipboard.writeText(promptOutput.value).then(() => {
            this.showToast('Copiado!', 'Prompt copiado para a área de transferência', 'success');
        });
    },

    exportPDF() {
        this.showToast('Exportando...', 'Preparando arquivo PDF (recurso visual)', 'info');
        setTimeout(() => {
            this.showToast('PDF pronto!', 'Download iniciado (simulação)', 'success');
        }, 1500);
    },

    // ============================================
    // MESSAGES PAGE
    // ============================================
    initMessagesPage() {
        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Update tab buttons
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update tab panels
                document.querySelectorAll('.tab-panel').forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.dataset.tab === tabId) {
                        panel.classList.add('active');
                    }
                });
            });
        });

        // Form Submissions
        document.querySelectorAll('.message-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const type = form.dataset.type;
                this.generateMessage(type);
            });
        });
    },

    generateMessage(type = 'inicial') {
        const resultContainer = document.getElementById('message-result');
        const outputArea = document.getElementById('message-output');
        
        AppState.messageType = type;
        
        let message = MockData.messages[type] || MockData.messages.inicial;
        
        // Replace placeholders based on form inputs
        if (type === 'inicial') {
            const negocio = document.getElementById('msg-nome-negocio')?.value || 'Empresa';
            const nicho = document.getElementById('msg-nicho')?.value || 'seu segmento';
            message = message.replace('{negocio}', negocio).replace('{nicho}', nicho);
        } else if (type === 'servico') {
            const tipoServico = document.getElementById('serv-tipo')?.value || 'Criação de Website';
            const beneficios = document.getElementById('serv-beneficios')?.value || 'Benefícios do serviço';
            const preco = document.getElementById('serv-preco')?.value || 'Sob consulta';
            
            const beneficiosList = beneficios.split('\n').filter(b => b.trim());
            message = message
                .replace('{tipo_servico}', tipoServico)
                .replace('{beneficio1}', beneficiosList[0] || 'Aumento de visibilidade')
                .replace('{beneficio2}', beneficiosList[1] || 'Mais clientes qualificados')
                .replace('{beneficio3}', beneficiosList[2] || 'Presença digital profissional')
                .replace('{preco}', preco);
        } else if (type === 'resposta') {
            const mensagem = document.getElementById('resp-mensagem')?.value || '';
            const objetivo = document.getElementById('resp-objetivo')?.value || 'agendar';
            
            let resposta = '';
            switch (objetivo) {
                case 'agendar':
                    resposta = 'Entendi perfeitamente sua necessidade e acredito que podemos ajudar muito seu negócio.';
                    break;
                case 'proposta':
                    resposta = 'Com base no que você mencionou, preparei uma proposta especial.';
                    break;
                case 'esclarecer':
                    resposta = 'Fico feliz em esclarecer suas dúvidas sobre nossos serviços.';
                    break;
                case 'fechar':
                    resposta = 'Excelente! Vamos finalizar os detalhes para começarmos o quanto antes.';
                    break;
            }
            message = message.replace('{resposta_personalizada}', resposta);
        }
        
        this.showToast('Gerando mensagem...', 'Aguarde um momento', 'info');
        
        setTimeout(() => {
            outputArea.value = message;
            resultContainer.classList.remove('hidden');
            this.showToast('Mensagem gerada!', 'Sua mensagem está pronta', 'success');
        }, 1000);
    },

    copyMessage() {
        const messageOutput = document.getElementById('message-output');
        navigator.clipboard.writeText(messageOutput.value).then(() => {
            this.showToast('Copiado!', 'Mensagem copiada para a área de transferência', 'success');
        });
    },

    regenerateMessage() {
        if (AppState.messageType) {
            this.generateMessage(AppState.messageType);
        }
    },

    // ============================================
    // HISTÓRICO PAGE
    // ============================================
    initHistoricoPage() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter items
                document.querySelectorAll('.historico-item').forEach(item => {
                    if (filter === 'all' || item.dataset.type === filter) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    },

    // ============================================
    // PLANOS PAGE
    // ============================================
    initPlanosPage() {
        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.closest('.faq-item');
                item.classList.toggle('open');
            });
        });

        // Upgrade Button
        const upgradeBtn = document.querySelector('.plan-card.featured .btn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => {
                this.showToast('Redirecionando...', 'Indo para página de pagamento (simulação)', 'info');
            });
        }
    },

    // ============================================
    // CONFIG PAGE
    // ============================================
    initConfigPage() {
        // Profile Form
        const profileForm = document.querySelector('.config-section:first-child .config-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showToast('Perfil atualizado!', 'Suas informações foram salvas', 'success');
            });
        }

        // Password Form
        const passwordForm = document.querySelectorAll('.config-form')[1];
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showToast('Senha alterada!', 'Sua nova senha foi salva', 'success');
            });
        }

        // Delete Account
        const deleteBtn = document.querySelector('.btn-danger');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
                    this.showToast('Conta excluída', 'Sua conta foi removida (simulação)', 'warning');
                }
            });
        }
    },

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================
    showToast(title, message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            danger: 'fa-times-circle',
            info: 'fa-info-circle'
        };

        toast.innerHTML = `
            <i class="toast-icon fas ${icons[type]}"></i>
            <div class="toast-content">
                <span class="toast-title">${title}</span>
                <span class="toast-message">${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
};

// Initialize App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
