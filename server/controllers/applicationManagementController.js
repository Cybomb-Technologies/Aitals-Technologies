import Application from '../models/ApplicationManagement.js';

// Get all job openings (public)
export const getJobOpenings = async (req, res) => {
  try {
    const { department } = req.query;
    
    const filter = { isActive: true };
    if (department && department !== 'All') {
      filter.department = department;
    }

    const openings = await Application.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: openings
    });
  } catch (error) {
    console.error('Error fetching job openings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job openings',
      error: error.message
    });
  }
};

// Get job opening by ID (public)
export const getJobOpeningById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const opening = await Application.findOne({ 
      _id: id, 
      isActive: true 
    });

    if (!opening) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found'
      });
    }

    res.status(200).json({
      success: true,
      data: opening
    });
  } catch (error) {
    console.error('Error fetching job opening:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job opening',
      error: error.message
    });
  }
};

// Get all applications (admin)
export const getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, department, search } = req.query;
    
    const filter = {};
    
    if (department && department !== 'All') {
      filter.department = department;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Application.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Application.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
};

// Create new job opening (admin)
export const createApplication = async (req, res) => {
  try {
    const applicationData = req.body;

    // Convert string arrays to arrays if they come as strings
    if (typeof applicationData.requirements === 'string') {
      applicationData.requirements = applicationData.requirements.split(',').map(item => item.trim());
    }
    if (typeof applicationData.responsibilities === 'string') {
      applicationData.responsibilities = applicationData.responsibilities.split(',').map(item => item.trim());
    }
    if (typeof applicationData.benefits === 'string') {
      applicationData.benefits = applicationData.benefits.split(',').map(item => item.trim());
    }

    const application = new Application(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Job opening created successfully',
      data: application
    });
  } catch (error) {
    console.error('Error creating job opening:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating job opening',
      error: error.message
    });
  }
};

// Update job opening (admin)
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert string arrays to arrays if they come as strings
    if (typeof updateData.requirements === 'string') {
      updateData.requirements = updateData.requirements.split(',').map(item => item.trim());
    }
    if (typeof updateData.responsibilities === 'string') {
      updateData.responsibilities = updateData.responsibilities.split(',').map(item => item.trim());
    }
    if (typeof updateData.benefits === 'string') {
      updateData.benefits = updateData.benefits.split(',').map(item => item.trim());
    }

    const application = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job opening updated successfully',
      data: application
    });
  } catch (error) {
    console.error('Error updating job opening:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating job opening',
      error: error.message
    });
  }
};

// Delete job opening (admin)
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job opening deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job opening:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job opening',
      error: error.message
    });
  }
};

// Toggle job opening status (admin)
export const toggleApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found'
      });
    }

    application.isActive = !application.isActive;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Job opening ${application.isActive ? 'activated' : 'deactivated'} successfully`,
      data: application
    });
  } catch (error) {
    console.error('Error toggling job opening status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling job opening status',
      error: error.message
    });
  }
};