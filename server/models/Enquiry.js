// Updated Enquiry model (Enquiry.js)
import mongoose from 'mongoose';

const enquirySchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: '',
    },
    budget: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;