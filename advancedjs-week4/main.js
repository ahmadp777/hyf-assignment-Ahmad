import { ScreenshotList } from './screenshotListClass.js';
import { ScreenshotForm } from './screenshotFormClass.js';
import { ErrorDisplay } from './errorDisplayClass.js';


// Main application class

class App {
    constructor() {
        this.screenshotList = null;
        this.screenshotForm = null;
    }

    async init() {
        // Initialize error display
        ErrorDisplay.init('error-container');

        // Initialize screenshot list
        this.screenshotList = new ScreenshotList('screenshot-list', (err) => ErrorDisplay.show(err));
        
        // Initialize form
        this.screenshotForm = new ScreenshotForm('form-container', this.screenshotList, (err) => ErrorDisplay.show(err));
        this.screenshotForm.onClear = () => ErrorDisplay.clear();
        this.screenshotForm.render();

        // Load existing screenshots
        await this.screenshotList.loadAndRender();
    }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
