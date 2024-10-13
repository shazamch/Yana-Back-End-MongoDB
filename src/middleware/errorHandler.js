const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging

    // Check if the headers have already been sent
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            code: err.code || null, // Include the custom error code if provided
        },
    });
};

module.exports = errorHandler;
