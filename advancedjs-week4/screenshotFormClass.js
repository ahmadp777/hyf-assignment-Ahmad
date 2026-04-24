import { Screenshot } from './screenshotClass.js';

// ==================== Screenshot Form Class ====================

export class ScreenshotForm {
    constructor(formId, screenshotList, onError = (err) => console.error(err)) {
        this.container = document.getElementById(formId);
        this.screenshotList = screenshotList;
        this.urlInput = null;
        this.captureBtn = null;
        this.previewContainer = null;
        this.currentScreenshot = null;
        this.onError = onError;
    }

    // Render the form UI
    render() {
        this.container.innerHTML = '';

        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        this.urlInput = document.createElement('input');
        this.urlInput.type = 'text';
        this.urlInput.id = 'urlInput';
        this.urlInput.placeholder = 'Enter URL (f.ex. https://example.com)';

        this.captureBtn = document.createElement('button');
        this.captureBtn.type = 'button';
        this.captureBtn.className = 'btn btn-primary';
        this.captureBtn.textContent = 'Capture Screenshot';
        this.captureBtn.onclick = () => this.handleCapture();

        inputGroup.appendChild(this.urlInput);
        inputGroup.appendChild(this.captureBtn);

        this.previewContainer = document.createElement('div');
        this.previewContainer.id = 'preview';
        this.previewContainer.className = 'preview-container';

        this.container.appendChild(inputGroup);
        this.container.appendChild(this.previewContainer);
    }

    // Capture button click handler
    async handleCapture() {
        const url = this.urlInput.value.trim();

        this.setLoading(true, 'Capturing...');
        this.clearPreview();
        this.onClear();

        try {
            this.currentScreenshot = await Screenshot.capture(url);
            this.showPreview(this.currentScreenshot);
        } catch (error) {
            this.onError(error);
        } finally {
            this.setLoading(false);
        }
    }

    // Show preview of captured screenshot
    showPreview(screenshot) {
        this.previewContainer.innerHTML = '';

        const previewCard = document.createElement('div');
        previewCard.className = 'preview-card';

        const img = document.createElement('img');
        img.src = screenshot.image;
        img.alt = 'Screenshot preview';

        const actions = document.createElement('div');
        actions.className = 'preview-actions';

        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn btn-success';
        saveBtn.textContent = 'Save Screenshot';
        saveBtn.onclick = () => this.handleSave(saveBtn);

        const discardBtn = document.createElement('button');
        discardBtn.className = 'btn btn-secondary';
        discardBtn.textContent = 'Discard';
        discardBtn.onclick = () => this.clearPreview();

        actions.appendChild(saveBtn);
        actions.appendChild(discardBtn);

        previewCard.appendChild(img);
        previewCard.appendChild(actions);

        this.previewContainer.appendChild(previewCard);
    }

    // Save button handler
    async handleSave(saveBtn) {
        if (!this.currentScreenshot) return;

        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';
        this.onClear();

        try {
            await this.currentScreenshot.save();
            this.screenshotList.add(this.currentScreenshot);
            this.clearPreview();
            this.urlInput.value = '';
            this.currentScreenshot = null;
        } catch (error) {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save Screenshot';
            this.onError(error);
        }
    }

    // Clear the preview area
    clearPreview() {
        this.previewContainer.innerHTML = '';
        this.currentScreenshot = null;
    }

    // Set loading state on the capture button
    setLoading(isLoading, text = 'Capture Screenshot') {
        this.captureBtn.disabled = isLoading;
        this.captureBtn.textContent = isLoading ? text : 'Capture Screenshot';
        this.urlInput.disabled = isLoading;
    }

    // Callback to clear the error display — set by App
    onClear() {}
}
