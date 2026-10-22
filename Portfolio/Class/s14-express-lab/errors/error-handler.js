export class WeatherError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        error: error.statusCode ? error.message : "Internal server error"
    });
};
