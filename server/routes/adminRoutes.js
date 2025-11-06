import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ✅ Allowed domains (bypass token verification)
const ALLOWED_DOMAINS = [
  "https://admin.cybomb.com",
  "http://localhost:5173",
];

// ✅ Auth Middleware (Modified)
export const authMiddleware = async (req, res, next) => {
  const origin = req.headers.origin;
  const referer = req.headers.referer || "";

  // If request is from allowed domain, skip token check
  if (
    (origin && ALLOWED_DOMAINS.includes(origin)) ||
    ALLOWED_DOMAINS.some((d) => referer.startsWith(d))
  ) {
    console.log("✅ Domain allowed without token:", origin || referer);
    return next();
  }

  // Otherwise, verify JWT
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error.message);
    res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

// ✅ Admin Registration (Store plain text password for visibility)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin = true } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Store both hashed and plain text passwords
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new admin user with both passwords
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      plainPassword: password, // Store plain text password for visibility
      isAdmin: Boolean(isAdmin),
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Admin user registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        password: password, // Return plain password in response
      },
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});

// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isAdmin: true });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        isAdmin: true,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        password: user.plainPassword, // Return plain password
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ✅ Token Verify Endpoint
router.get("/verify", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user || "Bypassed (allowed domain)",
  });
});

// ✅ Get All Admin Users WITH PASSWORDS (Updated)
router.get("/admin", authMiddleware, async (req, res) => {
  try {
    // REMOVED .select("-password") to include all fields including passwords
    const admins = await User.find({ isAdmin: true })
      .sort({ createdAt: -1 });

    console.log("🔍 Fetched admins with passwords:", admins);

    // Return admins with plain text passwords
    const adminsWithPasswords = admins.map(admin => ({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      password: admin.plainPassword || "No password set", // Use plainPassword field
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt
    }));

    res.json({
      success: true,
      admins: adminsWithPasswords,
      count: admins.length,
    });
  } catch (error) {
    console.error("Get admins error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ✅ Get Single Admin User WITH PASSWORD
router.get("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const admin = await User.findById(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin,
        password: admin.plainPassword || "No password set",
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt
      },
    });
  } catch (error) {
    console.error("Get admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ✅ Update Admin User (Updated to handle plain passwords)
router.put("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (typeof isAdmin !== 'undefined') user.isAdmin = Boolean(isAdmin);

    // Update password if provided
    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }
      
      // Update both hashed and plain passwords
      const saltRounds = 12;
      user.password = await bcrypt.hash(password, saltRounds);
      user.plainPassword = password; // Store plain text
    }

    await user.save();

    res.json({
      success: true,
      message: "Admin user updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        password: user.plainPassword, // Return plain password
      },
    });
  } catch (error) {
    console.error("Update admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ✅ Delete Admin User
router.delete("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (req.user && req.user.userId === id) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account",
      });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Admin user deleted successfully",
    });
  } catch (error) {
    console.error("Delete admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ✅ Special endpoint to get passwords only (for admin management)
router.get("/admin-passwords", authMiddleware, async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true })
      .select("name email plainPassword createdAt")
      .sort({ createdAt: -1 });

    console.log("🔐 Fetched admins with plain passwords:", admins);

    res.json({
      success: true,
      admins: admins.map(admin => ({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        password: admin.plainPassword || "No password set",
        createdAt: admin.createdAt
      })),
      count: admins.length,
    });
  } catch (error) {
    console.error("Get admin passwords error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;