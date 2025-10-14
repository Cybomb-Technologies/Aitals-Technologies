import Application from '../models/Application.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create new application
export const createApplication = async (req, res) => {
  try {
    const { name, email, phone, role, experience, coverLetter } = req.body;
    
    // Validation
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and role are required fields.',
      });
    }

    let resumeData = null;
    
    // Handle file upload
    if (req.file) {
      resumeData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype
      };
    }

    const application = new Application({
      name,
      email,
      phone,
      role,
      experience,
      coverLetter,
      resume: resumeData
    });

    await application.save();
    
    res.status(201).json({
      success: true,
      message: req.file ? 'Application submitted successfully with resume.' : 'Application submitted successfully.',
      data: application
    });
  } catch (error) {
    console.error('Application creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all applications (Admin only)
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single application by ID (Admin only)
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete application (Admin only)
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get resume file - FIXED VERSION
export const getResumeFile = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application || !application.resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // The path is already stored correctly in the database, use it directly
    const filePath = application.resume.path;
    
    console.log('Attempting to serve file from path:', filePath);
    
    // Set appropriate headers
    res.setHeader('Content-Type', application.resume.mimetype);
    res.setHeader('Content-Disposition', `inline; filename="${application.resume.originalName}"`);
    
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        if (err.code === 'ENOENT') {
          return res.status(404).json({
            success: false,
            message: 'Resume file not found on server'
          });
        }
        return res.status(500).json({
          success: false,
          message: 'Error serving file'
        });
      }
    });
  } catch (error) {
    console.error('Get resume file error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};