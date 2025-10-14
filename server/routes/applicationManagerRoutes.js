import express from 'express';
import {
  getJobOpenings,
  getJobOpeningById,
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  toggleApplicationStatus
} from '../controllers/applicationManagementController.js';
import { authMiddleware } from './adminRoutes.js';

const router = express.Router();

// Public routes
router.get('/openings', getJobOpenings);
router.get('/openings/:id', getJobOpeningById);

// Admin routes
router.get('/', authMiddleware, getAllApplications);
router.post('/', authMiddleware, createApplication);
router.put('/:id', authMiddleware, updateApplication);
router.delete('/:id', authMiddleware, deleteApplication);
router.patch('/:id/status', authMiddleware, toggleApplicationStatus);

export default router;