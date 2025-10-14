import express from 'express';
import { createEnquiry, getEnquiries, getEnquiryById, deleteEnquiry } from '../controllers/enquiryController.js';
import { authMiddleware } from './adminRoutes.js';

const router = express.Router();

// Public routes
router.post('/', createEnquiry);

// Admin protected routes
router.get('/', authMiddleware, getEnquiries);
router.get('/:id', authMiddleware, getEnquiryById);
router.delete('/:id', authMiddleware, deleteEnquiry);

export default router;