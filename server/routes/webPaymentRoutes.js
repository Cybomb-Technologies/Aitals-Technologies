const express = require("express");
const router = express.Router();
const {
  createWebPackageOrder,
  verifyWebPackagePayment,
  getOrderDetails,
  webPackageWebhook
} = require("../controllers/webPaymentController");

// ✅ Web Package Payment Routes
router.post("/create-web-order", createWebPackageOrder);
router.post("/verify-web-payment", verifyWebPackagePayment);
router.get("/order/:orderId", getOrderDetails);
router.post("/webhook", webPackageWebhook); // For Cashfree webhooks

module.exports = router;