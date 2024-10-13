class CustomError extends Error {
    constructor(message, statusCode, code) {
        super(message); // Call the parent class (Error) constructor with the message
        this.statusCode = statusCode; // Custom property to store the HTTP status code
        this.code = code; // Custom property to store a custom error code (optional)
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
}

module.exports = CustomError;
