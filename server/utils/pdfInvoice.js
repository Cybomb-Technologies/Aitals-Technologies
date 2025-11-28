// utils/pdfInvoice.js
import PDFDocument from "pdfkit";

/**
 * Generate invoice PDF as a Buffer
 * @param {Object} orderData - { orderId, planName, amount, currency }
 * @param {Object} customerDetails - { fullName, email, phone, address, city, pincode, ... }
 * @returns {Promise<Buffer>}
 */
export const generateInvoicePDF = (orderData, customerDetails) => {
  return new Promise((resolve, reject) => {
    try {
      const {
        orderId,
        planName,
        amount,
        currency = "INR",
      } = orderData;

      const {
        fullName,
        email,
        phone,
        address,
        city,
        pincode,
        company = "",
      } = customerDetails;

      const currencySymbol = currency === "INR" ? "₹" : "$";
      const subtotal = Math.round(amount / 1.18);
      const gstAmount = amount - subtotal;

      const doc = new PDFDocument({ size: "A4", margin: 50 });

      const buffers = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // ---------- HEADER ----------
      doc
        .fontSize(22)
        .fillColor("#111111")
        .text("Cybomb Technologies", { align: "left" });

      doc
        .moveDown(0.3)
        .fontSize(10)
        .fillColor("#555555")
        .text("Official Invoice", { align: "left" });

      doc.moveDown(0.5);
      doc
        .fontSize(10)
        .text(`Invoice No: ${orderId}`)
        .text(`Invoice Date: ${new Date().toLocaleDateString("en-IN")}`)
        .moveDown(1);

      // ---------- BILL TO ----------
      doc
        .fontSize(12)
        .fillColor("#111111")
        .text("Bill To:", { underline: true });

      doc
        .moveDown(0.3)
        .fontSize(10)
        .fillColor("#333333")
        .text(fullName);

      if (company) doc.text(company);

      doc
        .text(address)
        .text(`${city} - ${pincode}`)
        .text(`Phone: ${phone}`)
        .text(`Email: ${email}`)
        .moveDown(1);

      // ---------- ORDER DETAILS ----------
      doc
        .fontSize(12)
        .fillColor("#111111")
        .text("Order Summary", { underline: true });

      doc.moveDown(0.5);

      const tableTop = doc.y;
      const itemX = 50;
      const amountX = 400;

      doc
        .fontSize(10)
        .fillColor("#555555")
        .text("Description", itemX, tableTop)
        .text("Amount", amountX, tableTop, { align: "right" });

      doc.moveDown(0.5);
      doc
        .moveTo(itemX, doc.y)
        .lineTo(550, doc.y)
        .strokeColor("#DDDDDD")
        .stroke();

      doc.moveDown(0.5);

      // Line item: Package
      doc
        .fillColor("#222222")
        .text(`${planName} Package`, itemX, doc.y)
        .text(
          `${currencySymbol}${subtotal.toLocaleString("en-IN")}`,
          amountX,
          doc.y,
          { align: "right" }
        );

      doc.moveDown(0.5);

      // GST row
      doc
        .fillColor("#555555")
        .text("GST (18%)", itemX, doc.y)
        .text(
          `${currencySymbol}${gstAmount.toLocaleString("en-IN")}`,
          amountX,
          doc.y,
          { align: "right" }
        );

      doc.moveDown(0.5);

      // Separator
      doc
        .moveTo(itemX, doc.y)
        .lineTo(550, doc.y)
        .strokeColor("#DDDDDD")
        .stroke();

      doc.moveDown(0.5);

      // Total
      doc
        .fontSize(11)
        .fillColor("#111111")
        .text("Total", itemX, doc.y)
        .font("Helvetica-Bold")
        .text(
          `${currencySymbol}${amount.toLocaleString("en-IN")}`,
          amountX,
          doc.y,
          { align: "right" }
        )
        .font("Helvetica");

      doc.moveDown(2);

      // ---------- FOOTER ----------
      doc
        .fontSize(9)
        .fillColor("#555555")
        .text(
          "Thank you for your business with Cybomb Technologies.",
          { align: "center" }
        );

      doc
        .moveDown(0.3)
        .fontSize(8)
        .text(
          "This is a system-generated invoice and does not require a physical signature.",
          { align: "center" }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

export default {
  generateInvoicePDF,
};
