// controllers/newsletterController.js
import Newsletter from "../models/Newsletter.js";
import ExcelJS from "exceljs";
import csv from "csv-parser";
import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import Notification from "../models/Notification.js";

// Subscribe to newsletter
// Subscribe to newsletter
export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email, name, source = "blog" } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({
          success: false,
          message: "Email is already subscribed",
        });
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.unsubscribedAt = null;
        existingSubscriber.name = name || existingSubscriber.name;
        await existingSubscriber.save();

        // Create notification for re-subscription
        await Notification.create({
          title: "Newsletter Re-Subscribed",
          message: `${email} has re-subscribed to the newsletter.`,
          type: "cybomb-newsletter",
          isRead: false,
        });

        return res.json({
          success: true,
          message: "Successfully resubscribed to newsletter",
          data: existingSubscriber,
        });
      }
    }

    // Create new subscription
    const subscriber = new Newsletter({
      email,
      name,
      source,
    });

    await subscriber.save();

    // 🔥 CREATE NOTIFICATION HERE
    await Notification.create({
      title: "New Newsletter Subscription",
      message: `${email} subscribed to the newsletter.`,
      type: "aitals-newsletter",
      isRead: false,
    });

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: subscriber,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email is already subscribed",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// Get all subscribers (Admin only)
export const getSubscribers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "active",
      sortBy = "subscribedAt",
      sortOrder = "desc",
    } = req.query;

    // Build query
    let query = {};

    // Filter by status
    if (status === "active") {
      query.isActive = true;
    } else if (status === "inactive") {
      query.isActive = false;
    }

    // Search filter
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const subscribers = await Newsletter.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const total = await Newsletter.countDocuments(query);

    res.json({
      success: true,
      data: subscribers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const subscriber = await Newsletter.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.json({
      success: true,
      message: "Successfully unsubscribed from newsletter",
    });
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get newsletter statistics
export const getNewsletterStats = async (req, res) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments();
    const activeSubscribers = await Newsletter.countDocuments({
      isActive: true,
    });
    const inactiveSubscribers = await Newsletter.countDocuments({
      isActive: false,
    });

    // Get new subscribers this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const newSubscribersThisMonth = await Newsletter.countDocuments({
      subscribedAt: { $gte: startOfMonth },
    });

    res.json({
      success: true,
      data: {
        totalSubscribers,
        activeSubscribers,
        inactiveSubscribers,
        newSubscribersThisMonth,
      },
    });
  } catch (error) {
    console.error("Get newsletter stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Export subscribers to Excel
export const exportSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find()
      .sort({ subscribedAt: -1 })
      .select("email name source isActive subscribedAt");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Subscribers");

    // Add headers
    worksheet.columns = [
      { header: "Email", key: "email", width: 30 },
      { header: "Name", key: "name", width: 25 },
      { header: "Source", key: "source", width: 15 },
      { header: "Status", key: "status", width: 12 },
      { header: "Subscribed Date", key: "subscribedAt", width: 20 },
    ];

    // Style headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE6E6FA" },
    };

    // Add data
    subscribers.forEach((subscriber) => {
      worksheet.addRow({
        email: subscriber.email,
        name: subscriber.name || "N/A",
        source: subscriber.source,
        status: subscriber.isActive ? "Active" : "Inactive",
        subscribedAt: subscriber.subscribedAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      });
    });

    // Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=newsletter-subscribers-${
        new Date().toISOString().split("T")[0]
      }.xlsx`
    );

    // Send file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Export subscribers error:", error);
    res.status(500).json({
      success: false,
      message: "Export failed",
      error: error.message,
    });
  }
};

// Download import template
export const downloadTemplate = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Newsletter Import Template");

    // Add headers with styling
    worksheet.columns = [
      { header: "Email", key: "email", width: 30 },
      { header: "Name", key: "name", width: 25 },
      { header: "Source", key: "source", width: 15 },
      { header: "Status", key: "status", width: 12 },
      { header: "Subscribed Date", key: "subscribedAt", width: 20 },
    ];

    // Style headers
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4F46E5" },
    };
    worksheet.getRow(1).alignment = { horizontal: "center" };

    // Add example data
    const examples = [
      {
        email: "john.doe@example.com",
        name: "John Doe",
        source: "blog",
        status: "Active",
        subscribedAt: "31/10/2025",
      },
      {
        email: "sarah.smith@example.com",
        name: "Sarah Smith",
        source: "website",
        status: "Active",
        subscribedAt: "31/10/2025",
      },
      {
        email: "mike.wilson@example.com",
        name: "Mike Wilson",
        source: "blog",
        status: "Inactive",
        subscribedAt: "30/10/2025",
      },
      {
        email: "emily.johnson@example.com",
        name: "Emily Johnson",
        source: "newsletter",
        status: "Active",
        subscribedAt: "29/10/2025",
      },
    ];

    examples.forEach((example) => {
      worksheet.addRow(example);
    });

    // Add instructions
    worksheet.addRow([]);
    worksheet.addRow(["Instructions:"]);
    worksheet.addRow([
      "1. Fill in your subscriber data following the examples above",
    ]);
    worksheet.addRow(["2. Required fields: Email"]);
    worksheet.addRow([
      "3. Optional fields: Name, Source, Status, Subscribed Date",
    ]);
    worksheet.addRow([
      '4. Status must be "Active" or "Inactive" (case-insensitive)',
    ]);
    worksheet.addRow(["5. Date format: DD/MM/YYYY"]);
    worksheet.addRow(["6. Remove example rows before importing your data"]);
    worksheet.addRow(["7. Save file as .xlsx or .csv before importing"]);

    // Style instructions
    for (let i = 3; i <= 10; i++) {
      worksheet.getRow(i).font = { italic: true, color: { argb: "FF6B7280" } };
    }

    // Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=newsletter-import-template.xlsx"
    );

    // Send file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Download template error:", error);
    res.status(500).json({
      success: false,
      message: "Template download failed",
      error: error.message,
    });
  }
};

// Import subscribers from CSV/Excel
export const importSubscribers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    let subscribers = [];

    // Parse file based on extension
    if (fileExtension === ".csv") {
      subscribers = await parseCSV(filePath);
    } else if (fileExtension === ".xlsx" || fileExtension === ".xls") {
      subscribers = await parseExcel(filePath);
    } else {
      // Clean up uploaded file
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message: "Unsupported file format. Please upload CSV or Excel files.",
      });
    }

    if (subscribers.length === 0) {
      // Clean up uploaded file
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message: "No valid subscriber data found in the file.",
      });
    }

    // Process and save subscribers
    const results = await processSubscribers(subscribers);

    // Clean up uploaded file after processing
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: `Import completed successfully. ${results.added} new subscribers added. ${results.skipped} duplicates skipped.`,
      data: {
        totalProcessed: subscribers.length,
        added: results.added,
        skipped: results.skipped,
        errors: results.errors,
      },
    });
  } catch (error) {
    console.error("Import subscribers error:", error);

    // Clean up uploaded file in case of error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Import failed",
      error: error.message,
    });
  }
};

// Parse CSV file
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const subscribers = [];

    fs.createReadStream(filePath)
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.trim().toLowerCase(),
          mapValues: ({ value }) => value.trim(),
        })
      )
      .on("data", (row) => {
        subscribers.push(row);
      })
      .on("end", () => {
        resolve(subscribers);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

// Parse Excel file
const parseExcel = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

      if (data.length < 2) {
        resolve([]);
        return;
      }

      // Get headers (first row)
      const headers = data[0].map((header) =>
        header ? header.toString().trim().toLowerCase() : ""
      );

      // Process data rows
      const subscribers = [];
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const subscriber = {};

        headers.forEach((header, index) => {
          if (header && row[index] !== undefined) {
            subscriber[header] = row[index] ? row[index].toString().trim() : "";
          }
        });

        // Only add if there's at least an email
        if (subscriber.email) {
          subscribers.push(subscriber);
        }
      }

      resolve(subscribers);
    } catch (error) {
      reject(error);
    }
  });
};

// Process and save subscribers to database
const processSubscribers = async (subscribers) => {
  const results = {
    added: 0,
    skipped: 0,
    errors: [],
  };

  for (const subscriberData of subscribers) {
    try {
      // Map and validate data
      const email = subscriberData.email || subscriberData.Email;

      if (!email) {
        results.errors.push("Missing email in row");
        continue;
      }

      // Check for duplicate
      const existingSubscriber = await Newsletter.findOne({
        email: email.toLowerCase(),
      });
      if (existingSubscriber) {
        results.skipped++;
        continue;
      }

      // Map fields
      const name = subscriberData.name || subscriberData.Name || "N/A";
      const source = subscriberData.source || subscriberData.Source || "blog";

      // Convert status
      const status = subscriberData.status || subscriberData.Status || "Active";
      const isActive = status.toLowerCase() === "active";

      // Convert date
      let subscribedAt = new Date();
      const dateStr =
        subscriberData["subscribed date"] ||
        subscriberData["subscribeddate"] ||
        subscriberData.date;
      if (dateStr) {
        // Handle DD/MM/YYYY format
        const dateParts = dateStr.split("/");
        if (dateParts.length === 3) {
          const day = parseInt(dateParts[0]);
          const month = parseInt(dateParts[1]) - 1; // Months are 0-indexed
          const year = parseInt(dateParts[2]);
          subscribedAt = new Date(year, month, day);
        } else {
          // Try parsing as ISO string or other format
          const parsedDate = new Date(dateStr);
          if (!isNaN(parsedDate.getTime())) {
            subscribedAt = parsedDate;
          }
        }
      }

      // Create new subscriber
      const subscriber = new Newsletter({
        email: email.toLowerCase(),
        name: name !== "N/A" ? name : undefined,
        source,
        isActive,
        subscribedAt,
      });

      await subscriber.save();
      results.added++;
    } catch (error) {
      if (error.code === 11000) {
        results.skipped++;
      } else {
        results.errors.push(
          `Error processing ${subscriberData.email}: ${error.message}`
        );
      }
    }
  }

  return results;
};