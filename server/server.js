import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import local files
import connectDB from './config/db.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import applicationManagerRoutes from './routes/applicationManagerRoutes.js';
import { setupOverviewRoutes } from './routes/overviewRoutes.js';
// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// --- Middleware Setup ---
app.use(cors());

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupOverviewRoutes(app);
// Serve static files from uploads directory - FIXED PATH
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Route Definitions ---
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/applications', applicationManagerRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Aitals Server is Active',
    endpoints: {
      public: '/api/status',
      contact: '/api/contact',
      enquiry: '/api/enquiry', 
      application: '/api/application',
      blog: '/api/blog',
      admin: '/api/admin/login'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedUrl: req.originalUrl
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : {}
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`);
});