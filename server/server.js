// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import local files
import connectDB from "./config/db.js";
import publicRoutes from "./routes/publicRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import applicationManagerRoutes from "./routes/applicationManagerRoutes.js";
import { setupOverviewRoutes } from "./routes/overviewRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import webPaymentRoutes from "./routes/webPaymentRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// --- Middleware Setup ---
app.use(
  cors({
    origin: [
      "https://aitals.com",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "https://cybombadmin.cybomb.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup overview routes
setupOverviewRoutes(app);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Route Definitions ---
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/applications", applicationManagerRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/web-payment", webPaymentRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Aitals Server is Active",
    endpoints: {
      public: "/api/status",
      contact: "/api/contact",
      enquiry: "/api/enquiry",
      application: "/api/application",
      blog: "/api/blog",
      admin: "/api/admin/login",
      adminregister: "/api/admin",
    },
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : {},
  });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});