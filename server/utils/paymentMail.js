const nodemailer = require('nodemailer');
const { generateInvoicePDF } = require('./pdfInvoice');

// ✅ Fixed: createTransport (not createTransporter)
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  } catch (error) {
    console.error('❌ Transporter creation failed:', error);
    throw error;
  }
};

// Generate email HTML template
const generateInvoiceEmail = (orderData, customerDetails) => {
  const { orderId, planName, amount, currency = 'INR' } = orderData;
  const subtotal = Math.round(amount / 1.18);
  const gstAmount = amount - subtotal;
  const currencySymbol = currency === 'INR' ? '₹' : '$';
  const formatPrice = (price) => price.toLocaleString('en-IN');

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - Cybomb Technologies</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
        .email-container { max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); }
        .email-header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 40px 30px; text-align: center; }
        .success-icon { font-size: 48px; margin-bottom: 15px; }
        .email-title { font-size: 28px; font-weight: 800; margin-bottom: 10px; }
        .email-subtitle { font-size: 16px; opacity: 0.9; margin-bottom: 20px; }
        .confirmed-badge { background: rgba(255, 255, 255, 0.2); color: white; padding: 8px 20px; border-radius: 25px; font-size: 14px; font-weight: 600; border: 2px solid rgba(255, 255, 255, 0.3); }
        .email-content { padding: 30px; }
        .pdf-notice { background: #e0f2fe; border: 2px dashed #0369a1; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
        .order-section { background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-radius: 10px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #10b981; }
        .invoice-section { background: white; border-radius: 10px; padding: 20px; margin-bottom: 20px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
        .support-section { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
        .email-footer { text-align: center; padding: 20px; background: #1e293b; color: white; border-radius: 10px; margin-top: 20px; }
        .footer-text { font-size: 12px; opacity: 0.8; margin-bottom: 5px; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <div class="success-icon">🎉</div>
            <h1 class="email-title">Order Confirmed!</h1>
            <p class="email-subtitle">Thank you for choosing Cybomb Technologies</p>
            <div class="confirmed-badge">Payment Successful</div>
        </div>
        
        <div class="email-content">
            <!-- PDF Notice -->
            <div class="pdf-notice">
                <h3>📎 Invoice PDF Attached</h3>
                <p>Your official invoice has been generated and attached to this email.</p>
                <p><strong>Filename:</strong> Invoice_${orderId}.pdf</p>
                <p>Please download and save the PDF for your records.</p>
            </div>

            <!-- Order Details -->
            <div class="order-section">
                <h3>📋 Order Summary</h3>
                <div style="margin-top: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span><strong>Order ID:</strong></span>
                        <span>${orderId}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span><strong>Package:</strong></span>
                        <span>${planName}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span><strong>Order Date:</strong></span>
                        <span>${new Date().toLocaleDateString('en-IN')}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span><strong>Amount Paid:</strong></span>
                        <span>${currencySymbol}${formatPrice(amount)}</span>
                    </div>
                </div>
            </div>

            <!-- Invoice Preview -->
            <div class="invoice-section">
                <h3 style="color: #1e293b; margin-bottom: 15px;">🧾 Invoice Preview</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <thead>
                        <tr style="background: #f8fafc;">
                            <th style="padding: 12px; text-align: left; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0;">Description</th>
                            <th style="padding: 12px; text-align: right; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #64748b;">${planName} Package</td>
                            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; text-align: right;">${currencySymbol}${formatPrice(subtotal)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #64748b;">GST (18%)</td>
                            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; text-align: right;">${currencySymbol}${formatPrice(gstAmount)}</td>
                        </tr>
                        <tr style="background: #f0fdf4; font-weight: 600;">
                            <td style="padding: 12px; color: #1e293b;">Total Amount</td>
                            <td style="padding: 12px; color: #10b981; text-align: right; font-size: 16px;">${currencySymbol}${formatPrice(amount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Support Section -->
            <div class="support-section">
                <h3>📞 Support Center</h3>
                <div style="margin-top: 15px;">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <span style="font-size: 20px; margin-right: 10px;">📧</span>
                        <div>
                            <strong>Email Support</strong>
                            <div>support@cybomb.com</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 10px;">📱</span>
                        <div>
                            <strong>Phone Support</strong>
                            <div>+91 9876543210</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Next Steps -->
            <div style="background: #e0f2fe; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #0369a1; margin-bottom: 15px;">🔄 What's Next?</h3>
                <ol style="margin: 0; padding-left: 20px; color: #0c4a6e;">
                    <li style="margin-bottom: 8px;">Our project manager will contact you within 24 hours</li>
                    <li style="margin-bottom: 8px;">Discovery call to understand your requirements</li>
                    <li style="margin-bottom: 8px;">Design mockups and approval process</li>
                    <li style="margin-bottom: 8px;">Development phase begins</li>
                    <li>Final delivery and training session</li>
                </ol>
            </div>

            <!-- Email Footer -->
            <div class="email-footer">
                <p class="footer-text">Thank you for your business with Cybomb Technologies</p>
                <p class="footer-text">Need help? Contact us at support@cybomb.com or call +91 9876543210</p>
                <p class="footer-text">This is an automated email. Please do not reply to this message.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

// Send email with PDF attachment
const sendPaymentEmailWithPDF = async (orderData, customerDetails) => {
  try {
    // Generate PDF invoice
    const pdfBuffer = await generateInvoicePDF(orderData, customerDetails);
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Cybomb Technologies" <${process.env.SMTP_USER}>`,
      to: customerDetails.email,
      cc: process.env.RECEIVER_EMAIL,
      subject: `🎉 Order Confirmed & Invoice - ${orderData.orderId} - Cybomb Technologies`,
      html: generateInvoiceEmail(orderData, customerDetails),
      attachments: [
        {
          filename: `Invoice_${orderData.orderId}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Payment email with PDF sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      message: 'Email with PDF invoice sent successfully'
    };
    
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send email with PDF'
    };
  }
};

// Validate email data
const validateEmailData = (orderData, customerDetails) => {
  const requiredOrderFields = ['orderId', 'planName', 'amount'];
  const requiredCustomerFields = ['fullName', 'email', 'phone', 'address', 'city', 'pincode'];
  
  const missingOrderFields = requiredOrderFields.filter(field => !orderData[field]);
  const missingCustomerFields = requiredCustomerFields.filter(field => !customerDetails[field]);
  
  if (missingOrderFields.length > 0 || missingCustomerFields.length > 0) {
    const errorMessage = `Missing required fields: ${[...missingOrderFields, ...missingCustomerFields].join(', ')}`;
    throw new Error(errorMessage);
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customerDetails.email)) {
    throw new Error('Invalid email format');
  }
  
  return true;
};

// Main function to send payment confirmation email with PDF
const sendPaymentConfirmation = async (orderData, customerDetails) => {
  try {
    // Validate input data
    validateEmailData(orderData, customerDetails);
    
    // Send email with PDF attachment
    const result = await sendPaymentEmailWithPDF(orderData, customerDetails);
    
    return result;
    
  } catch (error) {
    console.error('❌ Payment confirmation error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send payment confirmation email with PDF'
    };
  }
};

module.exports = {
  sendPaymentConfirmation
};