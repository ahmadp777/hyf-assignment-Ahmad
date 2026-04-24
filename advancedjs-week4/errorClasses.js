// ==================== Error Classes ====================

export class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }

    toUserMessage() {
        return 'An error occurred. Please try again.';
    }
}

// Validation errors (f.ex. empty URL, invalid format)
export class ValidationError extends AppError {
    constructor(message, field = null) {
        super(message);
        this.field = field;
    }

    toUserMessage() {
        return this.message;
    }
}

// Error for API issues (f.ex. bad responses, rate limits)
export class ApiError extends AppError {
    constructor(message, statusCode = null, apiName = 'API') {
        super(message);
        this.statusCode = statusCode;
        this.apiName = apiName;
    }

    toUserMessage() {
        if (this.statusCode === 413) {
            return `Screenshot is too large to save in ${this.apiName}. Try a smaller image size.`;
        }
        if (this.statusCode === 403) {
            return `Access denied to ${this.apiName}. Please check your API key and subscription.`;
        }
        if (this.statusCode === 429) {
            return `Too many requests to ${this.apiName}. Please try again later.`;
        }
        if (this.statusCode === 404) {
            return `${this.apiName} endpoint not found. Please check the configuration.`;
        }
        if (this.statusCode >= 500) {
            return `${this.apiName} is temporarily unavailable. Please try again later.`;
        }
        return `Error from ${this.apiName}: ${this.message}`;
    }
}

// Error for network issues (offline, timeout, etc.)
export class NetworkError extends AppError {
    constructor(message = 'Network request failed') {
        super(message);
    }

    toUserMessage() {
        return this.message || 'Unable to connect. Please check your internet connection and try again.';
    }
}
