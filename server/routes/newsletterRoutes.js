// routes/newsletterRoutes.js
import express from 'express';
import {
  subscribeToNewsletter,
  getSubscribers,
  unsubscribeFromNewsletter,
  getNewsletterStats,
  exportSubscribers
} from '../controllers/newsletterController.js';
import { authMiddleware } from './adminRoutes.js';

const router = express.Router();

// Public routes
router.post('/subscribe', subscribeToNewsletter);
router.post('/unsubscribe', unsubscribeFromNewsletter);

// Admin protected routes
router.get('/subscribers', authMiddleware, getSubscribers);
router.get('/stats', authMiddleware, getNewsletterStats);
router.get('/export', authMiddleware, exportSubscribers);

export default router;