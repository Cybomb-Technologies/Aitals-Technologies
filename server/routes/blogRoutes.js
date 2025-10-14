import express from 'express';
import {
  getBlogs,
  getBlogById,
  getFeaturedBlogs,
  getBlogsByTag,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleFeatured,
  getBlogStats
} from '../controllers/blogController.js';
import { authMiddleware } from './adminRoutes.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/tag/:tag', getBlogsByTag);
router.get('/:id', getBlogById);

// Admin protected routes
router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);
router.patch('/:id/featured', authMiddleware, toggleFeatured);
router.get('/admin/stats', authMiddleware, getBlogStats);

export default router;