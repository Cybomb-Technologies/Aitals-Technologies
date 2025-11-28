// models/WebOrder.js
import mongoose from "mongoose";

const webOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    customerDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      company: { type: String, default: "" },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      requirements: { type: String, default: "" },
    },

    packageDetails: {
      planType: { type: String, required: true },
      planName: { type: String, required: true },
      basePrice: { type: Number, required: true },
      currency: { type: String, default: "INR" },
      gstAmount: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
    },

    paymentDetails: {
      paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "cancelled"],
        default: "pending",
      },
      paymentMethod: { type: String, default: "cashfree" },
      transactionId: { type: String },
      paymentLink: { type: String },
      paidAt: { type: Date },

      // Email Tracking
      emailSent: { type: Boolean, default: false },
      emailSentAt: { type: Date },
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    metadata: {
      currency: { type: String, default: "INR" },
      conversionRate: { type: Number, default: 1 },
      customerId: { type: String },
      notes: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
webOrderSchema.index({ orderId: 1 });
webOrderSchema.index({ "customerDetails.email": 1 });
webOrderSchema.index({ "paymentDetails.paymentStatus": 1 });
webOrderSchema.index({ createdAt: 1 });

// Export as ESM default
const WebOrder = mongoose.model("WebOrder", webOrderSchema);
export default WebOrder;
