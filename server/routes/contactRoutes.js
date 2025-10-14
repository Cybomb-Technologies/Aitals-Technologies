import express from 'express';
import { createContact, getContacts, getContactById, deleteContact } from '../controllers/contactController.js';
import { authMiddleware } from './adminRoutes.js';

const router = express.Router();

// Public routes
router.post('/', createContact);

// Admin protected routes
router.get('/', authMiddleware, getContacts);
router.get('/:id', authMiddleware, getContactById);
router.delete('/:id', authMiddleware, deleteContact);

export default router;