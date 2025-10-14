import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: false,
    },
    coverLetter: {
      type: String,
      required: false,
    },
    resume: {
      filename: {
        type: String,
        required: false,
      },
      originalName: {
        type: String,
        required: false,
      },
      path: {
        type: String,
        required: false,
      },
      size: {
        type: Number,
        required: false,
      },
      mimetype: {
        type: String,
        required: false,
      }
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;