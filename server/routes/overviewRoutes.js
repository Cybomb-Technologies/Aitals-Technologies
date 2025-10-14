// routes/overviewRoutes.js
import express from 'express';
import { authMiddleware } from './adminRoutes.js';

// Import all route files
import contactRoutes from './contactRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';
import applicationRoutes from './applicationRoutes.js';
import blogRoutes from './blogRoutes.js';
import applicationManagerRoutes from './applicationManagerRoutes.js';
import publicRoutes from './publicRoutes.js';

// Import models (adjust paths as needed)
import Contact from '../models/Contact.js';
import Enquiry from '../models/Enquiry.js';
import Application from '../models/Application.js';
import Blog from '../models/Blog.js';
import ApplicationManagement from '../models/ApplicationManagement.js';

const router = express.Router();

// Dashboard overview route
router.get('/overview', authMiddleware, async (req, res) => {
  try {
    // Get counts from all collections
    const [
      enquiriesCount,
      contactsCount,
      applicationsCount,
      blogsCount,
      jobOpeningsCount
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Contact.countDocuments(),
      Application.countDocuments(),
      Blog.countDocuments(),
      ApplicationManagement.countDocuments({ status: 'active' })
    ]);

    // Get recent activities from all collections
    const recentActivities = await getRecentActivities();

    // Calculate total interactions
    const totalInteractions = enquiriesCount + contactsCount + applicationsCount;

    const overviewData = {
      enquiriesCount,
      contactsCount,
      applicationsCount,
      blogsCount,
      jobOpeningsCount,
      totalInteractions,
      recentActivities
    };

    res.json({
      success: true,
      data: overviewData
    });
  } catch (error) {
    console.error('Overview data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching overview data',
      error: error.message
    });
  }
});

// Helper function to get recent activities
async function getRecentActivities() {
  try {
    const recentData = await Promise.all([
      // Recent enquiries
      Enquiry.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select('name email service createdAt')
        .lean(),
      
      // Recent contacts
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select('name email message createdAt')
        .lean(),
      
      // Recent applications
      Application.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select('name email role createdAt')
        .lean(),
      
      // Recent blogs
      Blog.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select('title tags createdAt')
        .lean()
    ]);

    const [recentEnquiries, recentContacts, recentApplications, recentBlogs] = recentData;

    // Format activities for the frontend
    const activities = [];

    // Add enquiries to activities
    recentEnquiries.forEach(enquiry => {
      activities.push({
        type: 'enquiry',
        title: 'New Service Enquiry',
        description: `${enquiry.name} enquired about ${enquiry.service}`,
        time: formatTimeAgo(enquiry.createdAt)
      });
    });

    // Add contacts to activities
    recentContacts.forEach(contact => {
      const shortMessage = contact.message.length > 50 
        ? contact.message.substring(0, 50) + '...'
        : contact.message;
      
      activities.push({
        type: 'contact',
        title: 'Contact Form Submission',
        description: `${contact.name}: ${shortMessage}`,
        time: formatTimeAgo(contact.createdAt)
      });
    });

    // Add applications to activities
    recentApplications.forEach(application => {
      activities.push({
        type: 'application',
        title: 'New Job Application',
        description: `${application.name} applied for ${application.role} position`,
        time: formatTimeAgo(application.createdAt)
      });
    });

    // Add blogs to activities
    recentBlogs.forEach(blog => {
      activities.push({
        type: 'blog',
        title: 'Blog Post Activity',
        description: `"${blog.title}" was ${blog.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000) ? 'published' : 'updated'}`,
        time: formatTimeAgo(blog.createdAt)
      });
    });

    // Sort by timestamp and return top 5
    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5);

  } catch (error) {
    console.error('Error getting recent activities:', error);
    return [];
  }
}

// Helper function to format time ago
function formatTimeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else {
    return time.toLocaleDateString();
  }
}

// Consolidated routes setup function
export function setupOverviewRoutes(app) {
  // Use all the individual routes
  app.use('/api/contact', contactRoutes);
  app.use('/api/enquiry', enquiryRoutes);
  app.use('/api/application', applicationRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/applications', applicationManagerRoutes);
  app.use('/api/public', publicRoutes);
  
  // Use the overview routes (including the /overview endpoint)
  app.use('/api/dashboard', router);
  
  console.log('All API routes have been configured:');
  console.log('- GET    /api/dashboard/overview');
  console.log('- POST   /api/contact');
  console.log('- GET    /api/contact (admin)');
  console.log('- POST   /api/enquiry');
  console.log('- GET    /api/enquiry (admin)');
  console.log('- POST   /api/application');
  console.log('- GET    /api/application (admin)');
  console.log('- GET    /api/blog');
  console.log('- POST   /api/blog (admin)');
  console.log('- GET    /api/applications/openings');
  console.log('- GET    /api/applications (admin)');
  console.log('- GET    /api/public/status');
}

export default router;