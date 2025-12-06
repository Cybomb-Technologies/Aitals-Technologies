import Enquiry from "../models/Enquiry.js";
import ExcelJS from "exceljs";
import csv from "csv-parser";
import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import Notification from "../models/Notification.js";

// Create new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const { email, subject, message, company, budget } = req.body;

    const enquiry = new Enquiry({
      email,
      subject,
      message,
      company,
      budget,
    });

    await enquiry.save();

    // ===============================
    // CREATE NOTIFICATION (ADMIN)
    // ===============================
    await Notification.create({
      title: "New Contact Enquiry",
      message: `New enquiry received from ${email}`,
      type: "aitals-contact",
      relatedId: enquiry._id
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Enquiry creation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// Get all enquiries (Admin only)
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    console.error("Get enquiries error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
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
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error("Get enquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
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
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Export enquiries to Excel (Admin only)
export const exportEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Enquiries");

    // Add headers
    worksheet.columns = [
      { header: "Email", key: "email", width: 30 },
      { header: "Subject", key: "subject", width: 35 },
      { header: "Message", key: "message", width: 50 },
      { header: "Company", key: "company", width: 25 },
      { header: "Budget", key: "budget", width: 20 },
      { header: "Created Date", key: "createdAt", width: 20 },
    ];

    // Style headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE6E6FA" },
    };

    // Add data
    enquiries.forEach((enquiry) => {
      worksheet.addRow({
        email: enquiry.email,
        subject: enquiry.subject,
        message: enquiry.message,
        company: enquiry.company || "N/A",
        budget: enquiry.budget || "N/A",
        createdAt: enquiry.createdAt.toLocaleDateString("en-US", {
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
      `attachment; filename=enquiries-${
        new Date().toISOString().split("T")[0]
      }.xlsx`
    );

    // Send file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Export enquiries error:", error);
    res.status(500).json({
      success: false,
      message: "Export failed",
      error: error.message,
    });
  }
};

// Download enquiry import template
export const downloadEnquiryTemplate = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Enquiry Import Template");

    // Add headers with styling
    worksheet.columns = [
      { header: "Email", key: "email", width: 30 },
      { header: "Subject", key: "subject", width: 35 },
      { header: "Message", key: "message", width: 50 },
      { header: "Company", key: "company", width: 25 },
      { header: "Budget", key: "budget", width: 20 },
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
        email: "client@example.com",
        subject: "Website Development Project",
        message:
          "I am interested in developing a new website for my business. Can you provide more information about your services?",
        company: "Tech Solutions Inc",
        budget: "$5000 - $10000",
      },
      {
        email: "customer@example.com",
        subject: "Mobile App Development",
        message:
          "Looking to build a cross-platform mobile application for our startup.",
        company: "Startup Innovations",
        budget: "$10000 - $20000",
      },
      {
        email: "inquiry@example.com",
        subject: "E-commerce Platform",
        message:
          "Need help setting up an online store with payment integration.",
        company: "Retail Pro",
        budget: "$3000 - $7000",
      },
    ];

    examples.forEach((example) => {
      worksheet.addRow(example);
    });

    // Add instructions
    worksheet.addRow([]);
    worksheet.addRow(["Instructions:"]);
    worksheet.addRow([
      "1. Fill in your enquiry data following the examples above",
    ]);
    worksheet.addRow(["2. Required fields: Email, Subject, Message"]);
    worksheet.addRow(["3. Optional fields: Company, Budget"]);
    worksheet.addRow(["4. Remove example rows before importing your data"]);
    worksheet.addRow(["5. Save file as .xlsx or .csv before importing"]);

    // Style instructions
    for (let i = 3; i <= 8; i++) {
      worksheet.getRow(i).font = { italic: true, color: { argb: "FF6B7280" } };
    }

    // Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=enquiry-import-template.xlsx"
    );

    // Send file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Download enquiry template error:", error);
    res.status(500).json({
      success: false,
      message: "Template download failed",
      error: error.message,
    });
  }
};

// Import enquiries from CSV/Excel
export const importEnquiries = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    let enquiries = [];

    // Parse file based on extension
    if (fileExtension === ".csv") {
      enquiries = await parseEnquiryCSV(filePath);
    } else if (fileExtension === ".xlsx" || fileExtension === ".xls") {
      enquiries = await parseEnquiryExcel(filePath);
    } else {
      // Clean up uploaded file
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message: "Unsupported file format. Please upload CSV or Excel files.",
      });
    }

    if (enquiries.length === 0) {
      // Clean up uploaded file
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message: "No valid enquiry data found in the file.",
      });
    }

    // Process and save enquiries
    const results = await processEnquiries(enquiries);

    // Clean up uploaded file after processing
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: `Import completed successfully. ${results.added} new enquiries added. ${results.skipped} duplicates skipped.`,
      data: {
        totalProcessed: enquiries.length,
        added: results.added,
        skipped: results.skipped,
        errors: results.errors,
      },
    });
  } catch (error) {
    console.error("Import enquiries error:", error);

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

// Parse CSV file for enquiries
const parseEnquiryCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const enquiries = [];

    fs.createReadStream(filePath)
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.trim().toLowerCase(),
          mapValues: ({ value }) => value.trim(),
        })
      )
      .on("data", (row) => {
        enquiries.push(row);
      })
      .on("end", () => {
        resolve(enquiries);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

// Parse Excel file for enquiries
const parseEnquiryExcel = (filePath) => {
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
      const enquiries = [];
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const enquiry = {};

        headers.forEach((header, index) => {
          if (header && row[index] !== undefined) {
            enquiry[header] = row[index] ? row[index].toString().trim() : "";
          }
        });

        // Only add if there's at least email, subject, and message
        if (enquiry.email && enquiry.subject && enquiry.message) {
          enquiries.push(enquiry);
        }
      }

      resolve(enquiries);
    } catch (error) {
      reject(error);
    }
  });
};

// Process and save enquiries to database
const processEnquiries = async (enquiries) => {
  const results = {
    added: 0,
    skipped: 0,
    errors: [],
  };

  for (const enquiryData of enquiries) {
    try {
      // Map and validate data
      const email = enquiryData.email || enquiryData.Email;
      const subject = enquiryData.subject || enquiryData.Subject;
      const message = enquiryData.message || enquiryData.Message;
      const company = enquiryData.company || enquiryData.Company || "";
      const budget = enquiryData.budget || enquiryData.Budget || "";

      if (!email || !subject || !message) {
        results.errors.push(
          "Missing required fields (email, subject, or message) in row"
        );
        continue;
      }

      // Check for duplicate (by email, subject, and similar message)
      const existingEnquiry = await Enquiry.findOne({
        email: email.toLowerCase(),
        subject: subject,
        message: message,
      });

      if (existingEnquiry) {
        results.skipped++;
        continue;
      }

      // Create new enquiry
      const enquiry = new Enquiry({
        email: email.toLowerCase(),
        subject: subject,
        message: message,
        company: company,
        budget: budget,
      });

      await enquiry.save();
      results.added++;
    } catch (error) {
      if (error.code === 11000) {
        results.skipped++;
      } else {
        results.errors.push(
          `Error processing ${enquiryData.email}: ${error.message}`
        );
      }
    }
  }

  return results;
};
