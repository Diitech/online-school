const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const { appendPaymentRecord } = require("../services/googleSheets");
const router = express.Router();

const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

// ── Payment validation constants ───────────────────────────────────────────────
const MIN_AMOUNT = 1000;

// ── In-memory processed transaction cache (prevents duplicates until server restart) ──
const processedTxRefs = new Set();

// ── Product definitions ────────────────────────────────────────────────────────
const PRODUCTS = {
  "master-bundle": {
    name: "Master Bundle: All 23 Universities UTME Pack",
    price: 15000,
  },
  "mega-bundle": {
    name: "Mega Bundle: All Exams + All Schools",
    price: 25000,
  },
  "starter-plan": {
    name: "Starter Plan",
    price: 50000,
  },
  "jamb-intensive": {
    name: "JAMB Intensive",
    price: 75000,
  },
  "private-tutoring": {
    name: "Private 1-on-1 Tutoring",
    price: 120000,
  },
};

// Generate unique transaction reference
function generateTxRef(productId) {
  const prefix = productId ? productId.toUpperCase().replace(/-/g, "_") : "DCT";
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString("hex");
  return `${prefix}-${timestamp}-${random}`;
}

// ── POST /api/payments/initialize ────────────────────────────────────────────
router.post("/initialize", async (req, res) => {
  try {
    const {
      product_id: productId,
      amount: customAmount,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
    } = req.body;

    // ── Validate customer info ────────────────────────────────────────────
    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required",
      });
    }
    if (!customerEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // ── Validate amount (server-side only, never trust frontend) ──────────
    let amount;
    let productName = "DChoice Tutoring Purchase";
    let resolvedProductId = productId || null;

    // Priority: known product_id > provided amount > error
    if (productId && PRODUCTS[productId]) {
      // Use server-defined price for known products
      amount = PRODUCTS[productId].price;
      productName = PRODUCTS[productId].name;
    } else if (customAmount !== undefined && customAmount !== null) {
      // Validate and use the amount provided by the frontend
      const parsed = parseFloat(customAmount);
      if (isNaN(parsed) || parsed <= 0 || !Number.isFinite(parsed)) {
        return res.status(400).json({
          success: false,
          message: "Enter a valid amount (minimum ₦1,000)",
        });
      }
      if (parsed < MIN_AMOUNT) {
        return res.status(400).json({
          success: false,
          message: `Amount must be at least ₦${MIN_AMOUNT.toLocaleString()}`,
        });
      }
      amount = parsed;
      // If productId was provided but not in PRODUCTS, use it as the product name
      if (productId) {
        productName = productId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Valid product_id or amount is required",
      });
    }

    const txRef = generateTxRef(resolvedProductId);
    const callbackUrl = `${process.env.FRONTEND_URL || "https://tutoring.dmultichoice.com"}/payment-success`;

    console.log(
      `💰 Initializing LIVE payment: ${productName} — ₦${amount} (${txRef})`,
    );

    // ── Call Flutterwave LIVE API ─────────────────────────────────────────
    const flutterwavePayload = {
      tx_ref: txRef,
      amount,
      currency: "NGN",
      redirect_url: callbackUrl,
      customer: {
        email: customerEmail,
        phone_number: customerPhone || "",
        name: customerName,
      },
      customizations: {
        title: "DChoice Tutoring",
        description: `Payment for ${productName}`,
        logo: "https://tutoring.dmultichoice.com/logo.png",
      },
      meta: {
        product_id: resolvedProductId || "custom",
        product_name: productName,
      },
    };

    console.log(
      "🔍 Flutterwave payload:",
      JSON.stringify(flutterwavePayload, null, 2),
    );

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      flutterwavePayload,
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      },
    );

    const paymentData = response.data;

    if (paymentData.status !== "success" || !paymentData.data?.link) {
      console.error(
        "❌ Flutterwave initialization failed:",
        JSON.stringify(paymentData),
      );
      return res.status(502).json({
        success: false,
        message: "Payment provider initialization failed",
        error: paymentData.message || "Unknown Flutterwave error",
      });
    }

    console.log(
      `✅ Flutterwave LIVE payment link created: ${paymentData.data.link}`,
    );

    return res.json({
      success: true,
      message: "Payment initialized",
      data: {
        tx_ref: txRef,
        amount,
        currency: "NGN",
        payment_link: paymentData.data.link,
        flutterwave_ref: paymentData.data?.reference || txRef,
      },
    });
  } catch (error) {
    console.error("❌ Payment init error:", {
      message: error.message,
      response: error.response?.data,
    });
    return res.status(500).json({
      success: false,
      message: "Error initializing payment",
      error: error.response?.data?.message || error.message,
    });
  }
});

// ── POST /api/payments/verify ────────────────────────────────────────────────
router.post("/verify", async (req, res) => {
  console.log("=== VERIFY REQUEST ===", JSON.stringify(req.body));

  try {
    const { transaction_id, tx_ref } = req.body;

    if (!transaction_id || !tx_ref) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID and TX ref are required",
      });
    }

    // ── Idempotency check: already processed this tx? ────────────────────
    if (processedTxRefs.has(tx_ref)) {
      console.log(`⏭️ Duplicate verification prevented for ${tx_ref}`);
      return res.json({
        success: true,
        message: "Already verified",
      });
    }

    // ── Verify with Flutterwave LIVE API ──────────────────────────────────
    const verifyResponse = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      },
    );

    const paymentData = verifyResponse.data?.data;

    if (!paymentData) {
      console.error("❌ No payment data from Flutterwave verify");
      return res.status(400).json({
        success: false,
        message: "Invalid response from payment provider",
      });
    }

    console.log("🔍 Flutterwave verification result:", {
      status: paymentData.status,
      amount: paymentData.amount,
      currency: paymentData.currency,
      tx_ref: paymentData.tx_ref,
    });

    // ── Validate payment status ───────────────────────────────────────────
    const isValid =
      paymentData.status === "successful" && paymentData.currency === "NGN";

    if (!isValid) {
      console.warn(
        `⚠️ Payment verification FAILED for ${tx_ref}: status=${paymentData.status}, currency=${paymentData.currency}`,
      );
      return res.status(400).json({
        success: false,
        message: `Payment verification failed: ${paymentData.status !== "successful" ? "payment not successful" : "currency mismatch"}`,
      });
    }

    // ── Payment is VALID — record to Google Sheets ────────────────────────
    processedTxRefs.add(tx_ref);
    console.log(`✅ Payment VERIFIED: ${tx_ref} — ₦${paymentData.amount}`);

    appendPaymentRecord({
      customer_name: paymentData.customer?.name || "N/A",
      customer_email: paymentData.customer?.email || "N/A",
      plan_name: paymentData.meta?.product_name || "Unknown",
      amount: parseFloat(paymentData.amount),
      currency: paymentData.currency,
      tx_ref,
      transaction_id: paymentData.id,
      status: "successful",
    }).catch((err) => {
      console.error("⚠️ Google Sheets write failed:", err.message);
    });

    return res.json({
      success: true,
      message: "Payment verified and recorded",
      data: {
        transaction_id: paymentData.id,
        tx_ref: paymentData.tx_ref,
        amount: paymentData.amount,
        currency: paymentData.currency,
        customer: {
          email: paymentData.customer?.email,
          name: paymentData.customer?.name,
        },
        status: paymentData.status,
      },
    });
  } catch (error) {
    console.error("❌ Verify error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.response?.data?.message || error.message,
    });
  }
});

module.exports = router;
