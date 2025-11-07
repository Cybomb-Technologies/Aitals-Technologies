// routes/newsletterRoutes.js
import express from "express";
import {
  subscribeToNewsletter,
  getSubscribers,
  unsubscribeFromNewsletter,
  getNewsletterStats,
  exportSubscribers,
  importSubscribers,
} from "../controllers/newsletterController.js";
import { authMiddleware } from "./adminRoutes.js";
import multer from "multer";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "import-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Check file types
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only CSV and Excel files are allowed."),
        false
      );
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Public routes
router.post("/subscribe", subscribeToNewsletter);
router.post("/unsubscribe", unsubscribeFromNewsletter);

// Admin protected routes
router.get("/subscribers", authMiddleware, getSubscribers);
router.get("/stats", authMiddleware, getNewsletterStats);
router.get("/export", authMiddleware, exportSubscribers);
router.post(
  "/import",
  authMiddleware,
  upload.single("file"),
  importSubscribers
);

export default router;
