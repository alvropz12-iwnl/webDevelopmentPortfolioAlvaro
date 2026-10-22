import express from 'express';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { AppError } from './utils/appError.js';

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

app.use(express.static('public'));

// Mount the authentication and initiative routes
app.use('/api/auth', authRoutes);
app.use('/api/initiatives', apiRoutes);

// 404 Unhandled Route Handler
app.all("/{*splat}", (req, res, next) => {
    next(new AppError(`Cannot find route ${req.originalUrl} on this server!`, 404));
});

// Centralized Global Error Handler
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});
