import Enquiry from '../models/Enquiry.js';

// Create new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const { email, subject, message, company, budget } = req.body;
    
    const enquiry = new Enquiry({
      email,
      subject,
      message,
      company,
      budget
    });

    await enquiry.save();
    
    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry
    });
  } catch (error) {
    console.error('Enquiry creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all enquiries (Admin only)
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: enquiries
    });
  } catch (error) {
    console.error('Get enquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single enquiry by ID (Admin only)
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    
    res.json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    console.error('Get enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete enquiry (Admin only)
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};