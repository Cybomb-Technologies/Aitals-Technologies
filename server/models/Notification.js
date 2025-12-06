import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['aitals-newsletter','aitals-blog', 'aitals-contact', 'aitals-application'],
    default: 'system'
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'type'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  }
}, {
  timestamps: true
});

// TTL index for automatic deletion after 1 month
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Notification', notificationSchema);