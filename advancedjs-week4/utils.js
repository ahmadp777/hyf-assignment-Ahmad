import { ValidationError, ApiError, NetworkError } from './errorClasses.js';

// ==================== Utility functions ====================

// Convert Blob to base64 string
export function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(new NetworkError('Failed to read image data'));
        reader.readAsDataURL(blob);
    });
}

// Validate a URL string
export function validateUrl(url) {
    if (!url || url.trim() === '') {
        throw new ValidationError('Please enter a URL', 'url');
    }

    try {
        new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
        throw new ValidationError('Please enter a valid URL (f.ex. https://example.com)', 'url');
    }

    return url.startsWith('http') ? url : `https://${url}`;
}

export async function buildCrudCrudError(operationLabel, response) {
    let details = '';
    try {
        details = await response.text();
    } catch {
        details = '';
    }

    if (response.status === 400 && details.includes("Endpoint doesn't exist")) {
        return new ValidationError('Your CrudCrud endpoint has expired or is invalid. Create a new endpoint URL on crudcrud.com and replace CRUDCRUD_ENDPOINT.');
    }

    return new ApiError(details || `Failed to ${operationLabel}`, response.status, 'CrudCrud');
}
