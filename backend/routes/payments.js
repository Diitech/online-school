const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const { appendPaymentRecord } = require("../services/googleSheets");
const router = express.Router();

const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
const FLW_PUBLIC_KEY = process.env.VITE_FLUTTERWAVE_PUBLIC_KEY;

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
// Initialize a Flutterwave payment and return the payment link
router.post("/initialize", async (req, res) => {
  try {
    const {
      product_id: productId,
      amount: customAmount,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      redirect_url: redirectUrl,
    } = req.body;

    // Validate required fields
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

    // Determine amount
    let amount;
    let productName = "DChoice Tutoring Purchase";
    let resolvedProductId = productId;

    if (productId && PRODUCTS[productId]) {
      amount = PRODUCTS[productId].price;
      productName = PRODUCTS[productId].name;
    } else if (customAmount && customAmount > 0) {
      amount = parseFloat(customAmount);
      resolvedProductId = null;
    } else {
      return res.status(400).json({
        success: false,
        message: "Valid product_id or amount is required",
      });
    }

    const txRef = generateTxRef(resolvedProductId);
    const callbackUrl = redirectUrl || `${req.protocol}://${req.get("host")}/api/payments/callback`;

    console.log(`💰 Initializing payment: ${productName} — ₦${amount} (${txRef})`);

    // Call Flutterwave API to initialize payment
    const flutterwavePayload = {
      tx_ref: txRef,
      amount,
      currency: "NGN",
      redirect_url: callbackUrl,
      payment_options: "card,banktransfer,ussd",
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

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      flutterwavePayload,
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    const paymentData = response.data;
    console.log("✅ Flutterwave payment initialized:", {
      status: paymentData.status,
      link: paymentData.data?.link?.substring(0, 50) + "...",
    });

    if (paymentData.status !== "success" || !paymentData.data?.link) {
      console.error("❌ Flutterwave initialization failed:", paymentData);
      return res.status(502).json({
        success: false,
        message: "Payment provider initialization failed",
        error: paymentData.message || "Unknown error",
      });
    }

    // Create a pending payment record in our database
    try {
      await Payment.create({
        transaction_id: 0, // Will be updated on callback/webhook
        tx_ref: txRef,
        amount,
        currency: "NGN",
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: customerPhone || "",
        plan_name: productName,
        product_ids: resolvedProductId ? [resolvedProductId] : [],
        status: "pending",
        verified: false,
      });
      console.log(`💾 Pending payment saved: ${txRef}`);
    } catch (dbError) {
      console.error("⚠️ Could not save pending payment:", dbError.message);
      // Don't fail the request — the webhook will create it
    }

    // Return payment link and details to frontend
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
    console.error("❌ Payment initialization error:", {
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

// ── GET /api/payments/callback ───────────────────────────────────────────────
// Handles the redirect after a Flutterwave checkout
router.get("/callback", async (req, res) => {
  const { transaction_id, tx_ref, status } = req.query;

  console.log("🔄 Payment callback:", { transaction_id, tx_ref, status });

  if (status === "successful" || status === "completed") {
    // Verify with Flutterwave API
    try {
      const verifyResponse = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          headers: {
            Authorization: `Bearer ${FLW_SECRET_KEY}`,
          },
          timeout: 10000,
        }
      );

      const tx = verifyResponse.data?.data;
      if (tx && tx.status === "successful") {
        // Update payment in DB
        await Payment.findOneAndUpdate(
          { tx_ref },
          {
            transaction_id: parseInt(transaction_id),
            status: "successful",
            verified: true,
            verified_at: new Date(),
            paid_at: new Date(),
          }
        );

        // Redirect to frontend success page
        return res.redirect(
          `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-success?tx_ref=${tx_ref}&transaction_id=${transaction_id}`
        );
      }
    } catch (verifyError) {
      console.error("Callback verification error:", verifyError.message);
    }
  }

  // Failed or cancelled
  return res.redirect(
    `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-failed?tx_ref=${tx_ref}&reason=${status || "cancelled"}`
  );
});

// ── POST /api/payments/verify ────────────────────────────────────────────────
// Verifies a completed payment (called from frontend after checkout modal)
router.post("/verify", async (req, res) => {
  console.log("=== VERIFY REQUEST RECEIVED ===");
  console.log("Body:", req.body);

  try {
    const { transaction_id, tx_ref, expected_amount } = req.body;

    if (!transaction_id || !tx_ref) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID and TX ref are required",
      });
    }

    const flutterwaveUrl = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
    console.log("Calling Flutterwave verify:", flutterwaveUrl);

    const response = await axios.get(flutterwaveUrl, {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    const paymentData = response.data?.data;

    if (!paymentData) {
      return res.status(400).json({
        success: false,
        message: "Invalid response from payment provider",
        raw: response.data,
      });
    }

    const isValid =
      paymentData.status === "successful" &&
      paymentData.currency === "NGN" &&
      (expected_amount === undefined || parseFloat(paymentData.amount) >= parseFloat(expected_amount));

    console.log("Payment verify result:", { status: paymentData.status, valid: isValid });

    if (isValid) {
      // Update or create payment record
      const payment = await Payment.findOneAndUpdate(
        { tx_ref },
        {
          transaction_id: paymentData.id,
          amount: parseFloat(paymentData.amount),
          currency: paymentData.currency,
          customer_email: paymentData.customer?.email || "N/A",
          customer_name: paymentData.customer?.name || "N/A",
          status: "successful",
          verified: true,
          verified_at: new Date(),
          paid_at: new Date(),
        },
        { upsert: true, new: true }
      );

      console.log(`✅ Payment verified and saved: ${tx_ref}`);

      // Log to Google Sheets (non-blocking)
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
        console.error("⚠️ Non-blocking Google Sheets write failed:", err.message);
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
          paid_at: paymentData.paid_at,
        },
      });
    } else {
      let reason = "Payment verification failed";
      if (paymentData.status !== "successful") reason = "Payment not successful";
      else if (paymentData.currency !== "NGN") reason = "Currency mismatch";

      return res.status(400).json({
        success: false,
        message: reason,
        data: {
          status: paymentData.status,
          amount: paymentData.amount,
          currency: paymentData.currency,
        },
      });
    }
  } catch (error) {
    console.error("❌ Payment verification error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.response?.data?.message || error.message,
    });
  }
});

// ── GET /api/payments/status/:tx_ref ─────────────────────────────────────────
// Check payment status from our database
router.get("/status/:tx_ref", async (req, res) => {
  try {
    const { tx_ref } = req.params;
    const payment = await Payment.findOne({ tx_ref });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.json({
      success: true,
      data: {
        tx_ref: payment.tx_ref,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        verified: payment.verified,
        paid_at: payment.paid_at,
        plan_name: payment.plan_name,
        customer_email: payment.customer_email,
      },
    });
  } catch (error) {
    console.error("Status check error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error checking payment status",
    });
  }
});

// ── GET /api/payments/access/:email ──────────────────────────────────────────
// Check what products a customer has access to
router.get("/access/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const payments = await Payment.find({
      customer_email: email,
      status: "successful",
      verified: true,
    }).sort({ paid_at: -1 });

    const unlockedProductIds = payments.reduce((acc, p) => {
      if (p.product_ids && p.product_ids.length > 0) {
        p.product_ids.forEach((id) => {
          if (!acc.includes(id)) acc.push(id);
        });
      }
      return acc;
    }, []);

    return res.json({
      success: true,
      data: {
        email,
        has_access: unlockedProductIds.length > 0,
        unlocked_products: unlockedProductIds,
        total_purchases: payments.length,
        payments: payments.map((p) => ({
          tx_ref: p.tx_ref,
          plan_name: p.plan_name,
          amount: p.amount,
          paid_at: p.paid_at,
        })),
      },
    });
  } catch (error) {
    console.error("Access check error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error checking access",
    });
  }
});

module.exports = router;
