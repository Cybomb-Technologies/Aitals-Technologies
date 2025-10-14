import express from 'express';
import { createApplication, getApplications, getApplicationById, deleteApplication } from '../controllers/applicationController.js';
import { authMiddleware } from './adminRoutes.js';

const router = express.Router();

// Public routes
router.post('/', createApplication);

// Admin protected routes
router.get('/', authMiddleware, getApplications);
router.get('/:id', authMiddleware, getApplicationById);
router.delete('/:id', authMiddleware, deleteApplication);

export default router;