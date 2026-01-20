/* ============================================
   LocalForge Dashboard - UI Components
   ============================================ */

// Modal Component
const Modal = {
    container: null,

    init() {
        this.container = document.getElementById('modal-container');
    },

    show(options = {}) {
        const { title, content, actions } = options;

        const modalHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title || 'Modal'}</h3>
                    <button class="modal-close" onclick="Modal.close()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content || ''}
                </div>
                ${actions ? `
                    <div class="modal-footer">
                        ${actions}
                    </div>
                ` : ''}
            </div>
        `;

        this.container.innerHTML = modalHTML;
        this.container.classList.add('active');

        // Close on backdrop click
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.close();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    },

    close() {
        this.container.classList.remove('active');
        this.container.innerHTML = '';
    },

    confirm(message, onConfirm, onCancel) {
        this.show({
            title: 'Confirmar',
            content: `<p>${message}</p>`,
            actions: `
                <button class="btn btn-outline" onclick="Modal.close(); ${onCancel ? onCancel + '()' : ''}">
                    Cancelar
                </button>
                <button class="btn btn-primary" onclick="Modal.close(); ${onConfirm}()">
                    Confirmar
                </button>
            `
        });
    }
};

// Loading Component
const Loading = {
    show(message = 'Carregando...') {
        const loading = document.createElement('div');
        loading.id = 'loading-overlay';
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <p>${message}</p>
            </div>
        `;

        // Add styles if not exists
        if (!document.getElementById('loading-styles')) {
            const style = document.createElement('style');
            style.id = 'loading-styles';
            style.textContent = `
                .loading-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(255, 255, 255, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .loading-content {
                    text-align: center;
                }
                .loading-spinner {
                    font-size: 3rem;
                    color: var(--secondary);
                    margin-bottom: 16px;
                }
                .loading-content p {
                    font-size: 1rem;
                    color: var(--text-secondary);
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(loading);
    },

    hide() {
        const loading = document.getElementById('loading-overlay');
        if (loading) {
            loading.remove();
        }
    }
};

// Form Validation
const FormValidator = {
    validate(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

        inputs.forEach(input => {
            this.clearError(input);

            if (!input.value.trim()) {
                this.showError(input, 'Este campo é obrigatório');
                isValid = false;
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                this.showError(input, 'Digite um e-mail válido');
                isValid = false;
            }
        });

        return isValid;
    },

    showError(input, message) {
        input.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    },

    clearError(input) {
        input.classList.remove('error');
        const error = input.parentElement.querySelector('.form-error');
        if (error) {
            error.remove();
        }
    },

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};

// Add form error styles
const formErrorStyles = document.createElement('style');
formErrorStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: var(--danger);
    }
    .form-error {
        color: var(--danger);
        font-size: 0.75rem;
        margin-top: 4px;
    }
`;
document.head.appendChild(formErrorStyles);

// Dropdown Component
const Dropdown = {
    init() {
        document.querySelectorAll('[data-dropdown]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const target = document.querySelector(trigger.dataset.dropdown);
                if (target) {
                    target.classList.toggle('active');
                }
            });
        });

        // Close all dropdowns on outside click
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        });
    }
};

// Tooltip Component
const Tooltip = {
    init() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.show(e.target, e.target.dataset.tooltip);
            });

            element.addEventListener('mouseleave', () => {
                this.hide();
            });
        });
    },

    show(target, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;

        // Add styles if not exists
        if (!document.getElementById('tooltip-styles')) {
            const style = document.createElement('style');
            style.id = 'tooltip-styles';
            style.textContent = `
                .tooltip {
                    position: fixed;
                    background: var(--primary);
                    color: white;
                    padding: 6px 12px;
                    border-radius: var(--radius);
                    font-size: 0.75rem;
                    z-index: 1000;
                    pointer-events: none;
                    animation: fadeIn 0.2s ease;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(tooltip);

        const rect = target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
    },

    hide() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
};

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    Modal.init();
    Dropdown.init();
    Tooltip.init();
});

// Export components
window.Modal = Modal;
window.Loading = Loading;
window.FormValidator = FormValidator;
