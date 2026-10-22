import express from 'express';
import { protect, requireAdmin } from '../middlewares/authMiddleware.js';
import { AppError } from '../utils/appError.js';

const router = express.Router();

// Simulated in-memory database
let initiatives = [
    { id: 1, title: 'Solar Canopy Expansion', priority: 'High', status: 'Active' },
    { id: 2, title: 'Campus Composting Loop', priority: 'Medium', status: 'In Review' }
];

router.route('/')
    .get(protect, (req, res) => {
        res.json({ status: 'success', count: initiatives.length, data: initiatives });
    })
    .post(protect, (req, res, next) => {
        const { title, priority } = req.body;

        if (typeof title !== 'string' || !title.trim() || !['High', 'Medium'].includes(priority)) {
            return next(new AppError('Title and a valid priority (High or Medium) are required', 400));
        }

        const id = initiatives.length > 0 ? Math.max(...initiatives.map(item => item.id)) + 1 : 1;
        const initiative = { id, title: title.trim(), priority, status: 'In Review' };
        initiatives.push(initiative);

        res.status(201).json({ status: 'success', data: initiative });
    });

router.route('/:id')
    .get(protect, (req, res, next) => {
        const initiative = initiatives.find(item => item.id === Number(req.params.id));

        if (!initiative) {
            return next(new AppError('Initiative not found', 404));
        }

        res.json({ status: 'success', data: initiative });
    })
    .delete(protect, requireAdmin, (req, res, next) => {
        const initiative = initiatives.find(item => item.id === Number(req.params.id));

        if (!initiative) {
            return next(new AppError('Initiative not found', 404));
        }

        initiatives = initiatives.filter(item => item.id !== initiative.id);
        res.json({ status: 'success', message: 'Initiative deleted', data: initiative });
    });

export default router;
