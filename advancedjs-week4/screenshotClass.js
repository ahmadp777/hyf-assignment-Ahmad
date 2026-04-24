import { AppError, ValidationError, ApiError, NetworkError } from './errorClasses.js';
export { AppError, ValidationError, ApiError, NetworkError };

import { blobToBase64, validateUrl, buildCrudCrudError } from './utils.js';

export const RAPIDAPI_KEY = '0cb4f80bc0msh6a90ed212575dd9p1c38f9jsnc82011dca9c4';
export const CRUDCRUD_ENDPOINT = 'https://crudcrud.com/api/02cdb3d86cce4450b906df9f7939f0c9';

// ==================== Screenshot class ====================

export class Screenshot {
    constructor({ _id = null, url, image, createdAt = new Date().toISOString() }) {
        this._id = _id;
        this.url = url;
        this.image = image;
        this.createdAt = createdAt;
        this.element = null;
    }

    // Capture screenshot from the API
    static async capture(url) {
        const validatedUrl = validateUrl(url);

        const apiUrl = new URL('https://website-screenshot6.p.rapidapi.com/screenshot');
        apiUrl.searchParams.append('url', validatedUrl);
        apiUrl.searchParams.append('width', '1920');
        apiUrl.searchParams.append('height', '1080');

        let response;
        try {
            response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'website-screenshot6.p.rapidapi.com',
                    'x-rapidapi-key': RAPIDAPI_KEY
                }
            });
        } catch (error) {
            throw new NetworkError('Failed to connect to screenshot service');
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new ApiError(errorText, response.status, 'Screenshot API');
        }

        const contentType = response.headers.get('content-type');
        let base64Image;

        if (contentType && (contentType.includes('application/json') || contentType.includes('text/html'))) {
            const data = await response.json();

            const screenshotUrl = data.screenshotUrl || data.imageUrl || data.url;
            const inlineImage = data.image || data.base64 || data.screenshot;

            if (typeof inlineImage === 'string' && inlineImage.startsWith('data:image/')) {
                base64Image = inlineImage;
            } else if (screenshotUrl) {
                try {
                    const imageResponse = await fetch(screenshotUrl);
                    if (imageResponse.ok) {
                        const blob = await imageResponse.blob();
                        base64Image = blob.size > 0 ? await blobToBase64(blob) : screenshotUrl;
                    } else {
                        base64Image = screenshotUrl;
                    }
                } catch {
                    base64Image = screenshotUrl;
                }
            } else {
                throw new ApiError(data.message || data.error || 'No screenshot image returned', response.status, 'Screenshot API');
            }
        } else if (contentType && contentType.startsWith('image/')) {
            const blob = await response.blob();
            if (blob.size === 0) {
                throw new ApiError('API returned empty image', 200, 'Screenshot API');
            }
            base64Image = await blobToBase64(blob);
        } else {
            throw new ApiError(`Unexpected response type: ${contentType}`, response.status, 'Screenshot API');
        }

        return new Screenshot({ url: validatedUrl, image: base64Image });
    }

    // Save screenshot to CrudCrud
    async save() {
        if (!CRUDCRUD_ENDPOINT) {
            throw new ValidationError('Please configure your CrudCrud endpoint');
        }

        let response;
        try {
            response = await fetch(`${CRUDCRUD_ENDPOINT}/screenshots`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: this.url,
                    image: this.image,
                    createdAt: this.createdAt
                })
            });
        } catch (error) {
            throw new NetworkError('Failed to connect to storage service');
        }

        if (!response.ok) {
            throw await buildCrudCrudError('save screenshot', response);
        }

        const data = await response.json();
        this._id = data._id;
        return this;
    }

    // Delete screenshot from CrudCrud
    async delete() {
        if (!this._id) {
            throw new ValidationError('Cannot delete unsaved screenshot');
        }

        if (!CRUDCRUD_ENDPOINT) {
            throw new ValidationError('Please configure your CrudCrud endpoint.');
        }

        let response;
        try {
            response = await fetch(`${CRUDCRUD_ENDPOINT}/screenshots/${this._id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            throw new NetworkError('Failed to connect to storage service');
        }

        if (!response.ok) {
            throw await buildCrudCrudError('delete screenshot', response);
        }

        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }

    // Load all screenshots from CrudCrud
    static async loadAll() {
        if (!CRUDCRUD_ENDPOINT) {
            throw new ValidationError('Please configure your CrudCrud endpoint.');
        }

        let response;
        try {
            response = await fetch(`${CRUDCRUD_ENDPOINT}/screenshots`);
        } catch (error) {
            throw new NetworkError('Failed to connect to storage service');
        }

        if (!response.ok) {
            throw await buildCrudCrudError('load screenshots', response);
        }

        const data = await response.json();
        return data.map(item => new Screenshot(item));
    }

    // Render this screenshot as a card element
    render(container, onError = (err) => console.error(err)) {
        this.element = document.createElement('div');
        this.element.className = 'screenshot-card';

        const img = document.createElement('img');
        img.src = this.image;
        img.alt = `Screenshot of ${this.url}`;

        const info = document.createElement('div');
        info.className = 'screenshot-info';

        const urlText = document.createElement('a');
        urlText.href = this.url;
        urlText.target = '_blank';
        urlText.className = 'screenshot-url';
        urlText.textContent = this.url;

        const date = document.createElement('span');
        date.className = 'screenshot-date';
        date.textContent = new Date(this.createdAt).toLocaleString();

        const actions = document.createElement('div');
        actions.className = 'screenshot-actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = async () => {
            if (confirm('Are you sure you want to delete this screenshot?')) {
                try {
                    deleteBtn.disabled = true;
                    deleteBtn.textContent = 'Deleting...';
                    await this.delete();
                } catch (error) {
                    deleteBtn.disabled = false;
                    deleteBtn.textContent = 'Delete';
                    onError(error);
                }
            }
        };

        info.appendChild(urlText);
        info.appendChild(date);
        if (this._id) {
            actions.appendChild(deleteBtn);
        }

        this.element.appendChild(img);
        this.element.appendChild(info);
        this.element.appendChild(actions);

        container.prepend(this.element);
        return this.element;
    }
}
