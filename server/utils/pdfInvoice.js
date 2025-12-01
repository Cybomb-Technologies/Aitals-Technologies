// utils/pdfInvoice.js
import PDFDocument from "pdfkit";

/**
 * Generate invoice PDF as a Buffer
 * @param {Object} orderData - { orderId, planName, amount, currency }
 * @param {Object} customerDetails - { fullName, email, phone, address, city, pincode, company? }
 * @returns {Promise<Buffer>}
 */
export const generateInvoicePDF = (orderData, customerDetails) => {
  return new Promise((resolve, reject) => {
    try {
      const { orderId, planName, amount, currency = "INR" } = orderData;

      const {
        fullName,
        email,
        phone,
        address,
        city,
        pincode,
        company = "",
      } = customerDetails;

      // ---- Currency handling (avoid broken ₹ glyph) ----
      // Helvetica in pdfkit doesn't support the rupee symbol properly.
      // Use "Rs." so it renders clean everywhere.
      const getCurrencySymbol = (c) => {
        if (c === "INR") return "Rs.";
        if (c === "USD") return "$";
        return c + " "; // fallback
      };
      const currencySymbol = getCurrencySymbol(currency);

      // GST breakdown
      const subtotal = Math.round(amount / 1.18);
      const gstAmount = amount - subtotal;
      const currentDate = new Date().toLocaleDateString("en-IN");

      // ---- Phone sanitization (avoid +91 +91...) ----
      const normalizedPhone =
        typeof phone === "string" && phone.trim().startsWith("+")
          ? phone.trim()
          : `+91 ${phone}`;

      const doc = new PDFDocument({ size: "A4", margin: 50 });

      const buffers = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // ---------- HEADER BACKGROUND ----------
      doc
        .fillColor("#6366f1")
        .rect(0, 0, doc.page.width, 120)
        .fill();

      // ---------- HEADER TEXT ----------
doc
  .fillColor("white")
  .fontSize(24)
  .font("Helvetica-Bold")
  .text("CYBOMB TECHNOLOGIES", 50, 40);

doc
  .fontSize(12)
  .font("Helvetica")
  .text("Web Development Services", 50, 70);

doc.fontSize(10).text("Invoice", 50, 90);

// Right side: invoice details
doc
  .fontSize(20)
  .font("Helvetica-Bold")
  .text("INVOICE", 400, 40);

// Label
doc
  .fontSize(10)
  .font("Helvetica")
  .text("Invoice #:", 400, 70);

// ---- SINGLE-LINE INVOICE ID (NO WRAP) ----
doc.font("Helvetica");
let idFontSize = 10;           // starting size
const maxIdWidth = 170;        // how wide the ID area can be

// shrink font until it fits in one line
while (doc.widthOfString(orderId) > maxIdWidth && idFontSize > 6) {
  idFontSize -= 1;
  doc.fontSize(idFontSize);
}

// draw invoice id in one line, no wrapping
doc.text(orderId, 400, 82, {
  lineBreak: false,
});

// reset font size for next fields
doc.fontSize(10);

doc.text(`Date: ${currentDate}`, 400, 97);
doc.text("Status: PAID", 400, 112);

// switch back to black for body later
doc.fillColor("black");


      // ---------- FROM / BILL TO ----------
      const fromX = 50;
      const toX = 300;
      const infoY = 150;

      // From section
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("From:", fromX, infoY);

      doc
        .font("Helvetica")
        .fontSize(10)
        .text("Cybomb Technologies", fromX, infoY + 20)
        .text("santhosh@cybomb.com", fromX, infoY + 35)
        .text("+91 9876543210", fromX, infoY + 50)
        .text("Chennai, Tamil Nadu", fromX, infoY + 65);

      // Bill To section
      doc
        .font("Helvetica-Bold")
        .text("Bill To:", toX, infoY);

      doc
        .font("Helvetica")
        .fontSize(10)
        .text(fullName, toX, infoY + 20)
        .text(email, toX, infoY + 35)
        .text(normalizedPhone, toX, infoY + 50);

      if (company) {
        doc.text(company, toX, infoY + 65);
      }

      doc.text(`${address}, ${city} - ${pincode}`, toX, infoY + 80);

      // ---------- SEPARATOR ----------
      doc
        .moveTo(50, 250)
        .lineTo(doc.page.width - 50, 250)
        .strokeColor("#cccccc")
        .stroke();

      // ---------- TABLE HEADER ----------
      const tableTop = 270;
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("black")
        .text("Description", 50, tableTop)
        .text("Amount", 400, tableTop, { align: "right" });

      // ---------- TABLE CONTENT ----------
      doc
        .font("Helvetica")
        .fontSize(10)
        .text(`${planName} Web Development Package`, 50, tableTop + 25)
        .text(
          `${currencySymbol}${subtotal.toLocaleString("en-IN")}`,
          400,
          tableTop + 25,
          { align: "right" }
        );

      doc
        .text("GST (18%)", 50, tableTop + 45)
        .text(
          `${currencySymbol}${gstAmount.toLocaleString("en-IN")}`,
          400,
          tableTop + 45,
          { align: "right" }
        );

      // Total separator
      doc
        .moveTo(50, tableTop + 70)
        .lineTo(doc.page.width - 50, tableTop + 70)
        .strokeColor("#000000")
        .stroke();

      // TOTAL row
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .text("TOTAL", 50, tableTop + 80)
        .text(
          `${currencySymbol}${amount.toLocaleString("en-IN")}`,
          400,
          tableTop + 80,
          { align: "right" }
        );

      // ---------- PAYMENT STATUS ----------
      doc
        .fillColor("#10b981")
        .fontSize(10)
        .text("PAYMENT SUCCESSFUL", 50, tableTop + 110);

      doc
        .fillColor("black")
        .font("Helvetica")
        .text(`Paid on: ${currentDate}`, 50, tableTop + 125);

      // ---------- NOTES ----------
      const notesY = tableTop + 160;
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .text("Important Notes:", 50, notesY);

      doc
        .font("Helvetica")
        .fontSize(9)
        .text(
          "• This is an official invoice for payment received.",
          50,
          notesY + 20
        )
        .text(
          "• Please keep this invoice for your records.",
          50,
          notesY + 35
        )
        .text(
          "• Your project timeline: 7-10 working days.",
          50,
          notesY + 50
        )
        .text(
          "• Contact support@cybomb.com for any queries.",
          50,
          notesY + 65
        );

      // ---------- FOOTER ----------
      const footerY = doc.page.height - 100;
      doc
        .fontSize(8)
        .fillColor("#555555")
        .text(
          "Thank you for choosing Cybomb Technologies",
          50,
          footerY,
          { align: "center" }
        )
        .text(
          "support@cybomb.com | +91 9876543210 | www.cybomb.com",
          50,
          footerY + 15,
          { align: "center" }
        )
        .text(
          "This is a computer-generated invoice. No signature required.",
          50,
          footerY + 30,
          { align: "center" }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  generateInvoicePDF,
};
