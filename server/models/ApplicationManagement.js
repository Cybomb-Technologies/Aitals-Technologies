import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Engineering', 'Design', 'Product', 'Quality', 'Marketing', 'Sales', 'Operations']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
  },
  salary: {
    type: String,
    required: [true, 'Salary range is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: [{
    type: String,
    trim: true
  }],
  responsibilities: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  applicationDeadline: {
    type: Date
  },
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Executive']
  }
}, {
  timestamps: true
});

// Index for better query performance
applicationSchema.index({ department: 1, isActive: 1 });
applicationSchema.index({ createdAt: -1 });

export default mongoose.model('ApplicationManagement', applicationSchema);