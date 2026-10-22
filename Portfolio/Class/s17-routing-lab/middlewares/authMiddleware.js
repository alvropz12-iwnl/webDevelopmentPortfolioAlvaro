import { AppError } from '../utils/appError.js';

export const protect = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new AppError('Unauthorized: Invalid or missing token', 401));
    }

    const token = authorization.slice(7);

    if (token === 'sustain-user-token') {
        req.user = { id: 101, name: 'Elena', role: 'user' };
    } else if (token === 'sustain-admin-token') {
        req.user = { id: 999, name: 'Prof. Gabriel', role: 'admin' };
    } else {
        return next(new AppError('Unauthorized: Invalid or missing token', 401));
    }

    next();
};

export const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return next(new AppError('Forbidden: Admin privilege required for this action', 403));
    }

    next();
};
