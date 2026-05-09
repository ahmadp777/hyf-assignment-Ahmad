import { AppError } from './errorClasses.js';

// ==================== Error display class ====================

// displaying error messages to the user
export class ErrorDisplay {
    static container = null;

    static init(containerId) {
        this.container = document.getElementById(containerId);
    }

    static show(error) {
        if (!this.container) return;

        this.container.innerHTML = '';

        const alertDiv = document.createElement('div');
        alertDiv.className = 'error-alert';

        let message;
        if (error instanceof AppError) {
            message = error.toUserMessage();
        } else if (error instanceof Error) {
            message = error.message;
        } else {
            message = 'An unexpected error occurred.';
        }

        alertDiv.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'error-close';
        closeBtn.textContent = '×';
        closeBtn.onclick = () => this.clear();

        alertDiv.appendChild(closeBtn);
        this.container.appendChild(alertDiv);

        console.error('Error:', error);
    }

    static clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
