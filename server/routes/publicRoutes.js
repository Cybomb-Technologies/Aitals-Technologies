import express from 'express';
import { getApiStatus } from '../controllers/publicController.js';

const router = express.Router();

// API status
router.get('/status', getApiStatus);

export default router;