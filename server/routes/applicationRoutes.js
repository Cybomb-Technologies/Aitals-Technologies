import express from 'express';
import { 
  createApplication, 
  getApplications, 
  getApplicationById, 
  deleteApplication, 
  getResumeFile 
} from '../controllers/applicationController.js';
import { authMiddleware } from './adminRoutes.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// Public routes - Add file upload middleware
router.post('/', upload.single('resume'), createApplication);

// Add route to get resume file
router.get('/:id/resume', authMiddleware, getResumeFile);

// Admin protected routes
router.get('/', authMiddleware, getApplications);
router.get('/:id', authMiddleware, getApplicationById);
router.delete('/:id', authMiddleware, deleteApplication);

export default router;