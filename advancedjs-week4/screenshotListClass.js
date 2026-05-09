import { Screenshot } from './screenshotClass.js';

// ==================== Screenshot List Class ====================

export class ScreenshotList {
    constructor(containerId, onError = (err) => console.error(err)) {
        this.container = document.getElementById(containerId);
        this.screenshots = [];
        this.emptyMessage = null;
        this.onError = onError;
    }

    // Load and display all saved screenshots
    async loadAndRender() {
        this.container.innerHTML = '<p class="loading">Loading saved screenshots...</p>';

        try {
            this.screenshots = await Screenshot.loadAll();
            this.render();
        } catch (error) {
            this.container.innerHTML = '';
            this.onError(error);
        }
    }

    // Add a screenshot to the list and render it
    add(screenshot) {
        this.screenshots.unshift(screenshot);
        this.hideEmptyMessage();
        screenshot.render(this.container, this.onError);
    }

    // Render all screenshots
    render() {
        this.container.innerHTML = '';

        if (this.screenshots.length === 0) {
            this.showEmptyMessage();
            return;
        }

        this.screenshots.forEach(screenshot => {
            screenshot.render(this.container, this.onError);
        });
    }

    showEmptyMessage() {
        this.emptyMessage = document.createElement('p');
        this.emptyMessage.className = 'empty-message';
        this.emptyMessage.textContent = 'No screenshots saved yet.';
        this.container.appendChild(this.emptyMessage);
    }

    hideEmptyMessage() {
        if (this.emptyMessage) {
            this.emptyMessage.remove();
            this.emptyMessage = null;
        }
    }
}
