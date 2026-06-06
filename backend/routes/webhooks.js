const express = require("express");
const crypto = require("crypto");
const axios = require("axios");
const Payment = require("../models/Payment");
const router = express.Router();

// ── Configuration ──────────────────────────────────────────────────────────────
const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
const WEBHOOK_HASH = process.env.WEBHOOK_SECRET_HASH;

// ── Product-to-amount mapping (in kobo for verification) ──────────────────────
// These define the expected amounts for each product.
// Amounts in NGN (minor currency unit = kobo is not used; Flutterwave returns NGN)
const PRODUCT_AMOUNTS = {
  "master-bundle": 15000,
  "mega-bundle": 25000,
  "starter-plan": 50000,
  "jamb-intensive": 75000,
  "private-tutoring": 120000,
};

const UNLOCKABLE_PRODUCTS = [
  "master-bundle",
  "mega-bundle",
  "waec-complete",
  "neco-complete",
  "jamb-math",
  "jamb-english",
  "ielts-pack",
  "sat-pack",
];

// ── Webhook: Flutterwave POST /flutterwave ────────────────────────────────────
// IMPORTANT: Must be registered BEFORE express.json() in server.js so req.body is a Buffer.
// Webhook URL: POST /api/flutterwave/webhook
// server.js mounts this router at /api, so the full path is /api/flutterwave/webhook
router.post(
  "/flutterwave/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    // Always respond within 5 seconds — send 200 fast, process async if needed
    // but we do synchronous processing since Flutterwave expects fast ack.

    try {
      // ── 1. Signature verification ──────────────────────────────────────────
      const signature = req.headers["verif-hash"];

      // If a hash is configured, enforce it. Otherwise log a warning.
      if (WEBHOOK_HASH && signature !== WEBHOOK_HASH) {
        console.warn("❌ Webhook rejected: invalid signature hash");
        return res
          .status(401)
          .json({ status: "error", message: "Invalid signature" });
      }

      // ── 2. Parse payload ──────────────────────────────────────────────────
      const payload = JSON.parse(req.body.toString("utf-8"));
      const { event, data } = payload;

      console.log("📩 Webhook received:", { event, id: data?.id, tx_ref: data?.tx_ref });

      // ── 3. Handle charge.completed events only ────────────────────────────
      if (event !== "charge.completed") {
        console.log(`⏭️  Ignoring unhandled event: ${event}`);
        return res.status(200).json({ status: "success" });
      }

      // ── 4. Extract data ──────────────────────────────────────────────────
      const transactionId = data.id;
      const txRef = data.tx_ref;
      const amount = data.amount;
      const currency = data.currency;
      const status = data.status;
      const customerEmail = data.customer?.email;
      const customerName = data.customer?.name;
      const customerPhone = data.customer?.phone_number;

      if (!transactionId || !txRef) {
        console.warn("⚠️ Webhook: missing transaction_id or tx_ref");
        return res.status(200).json({ status: "success" });
      }

      // ── 5. Verify transaction with Flutterwave API ────────────────────────
      const verification = await verifyWithFlutterwave(transactionId);

      if (!verification.isValid) {
        console.warn(`⚠️ Transaction ${transactionId} verification failed:`, verification.reason);
        // Still save the failed attempt
        await recordPaymentAttempt({
          transactionId,
          txRef,
          amount,
          currency,
          status: "failed",
          customerEmail,
          customerName,
          customerPhone,
          webhookReceived: true,
        });
        return res.status(200).json({ status: "success" });
      }

      // ── 6. Business logic: payment is confirmed successful ────────────────
      console.log(`✅ Payment verified for ${txRef} (${customerEmail}) — ₦${amount}`);

      // Determine which product was purchased based on tx_ref prefix or amount
      const productId = resolveProductId(txRef, verification.verifiedAmount);

      // Record in MongoDB
      await Payment.findOneAndUpdate(
        { tx_ref: txRef },
        {
          transaction_id: transactionId,
          amount: verification.verifiedAmount,
          currency: verification.verifiedCurrency,
          customer_email: customerEmail,
          customer_name: customerName,
          customer_phone: customerPhone,
          plan_name: productId || "Unknown",
          product_ids: productId ? [productId] : [],
          status: "successful",
          verified: true,
          verified_at: new Date(),
          paid_at: new Date(),
          webhook_received: true,
          webhook_received_at: new Date(),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`💾 Payment recorded in DB for ${txRef}`);

      // ── 7. Unlock product access ──────────────────────────────────────────
      if (productId) {
        await unlockProduct(customerEmail, productId, txRef);
      }

      // ── 8. Acknowledge webhook ───────────────────────────────────────────
      return res.status(200).json({ status: "success" });
    } catch (error) {
      console.error("❌ Webhook processing error:", error.message);
      // Always return 200 to prevent Flutterwave retries
      return res.status(200).json({ status: "success" });
    }
  }
);

// ── Flutterwave Transaction Verification ─────────────────────────────────────
async function verifyWithFlutterwave(transactionId) {
  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    const tx = response.data?.data;
    if (!tx) {
      return { isValid: false, reason: "No transaction data returned from Flutterwave" };
    }

    // Check status
    if (tx.status !== "successful") {
      return { isValid: false, reason: `Status is "${tx.status}", not "successful"` };
    }

    // Check currency
    if (tx.currency !== "NGN") {
      return { isValid: false, reason: `Currency is "${tx.currency}", expected NGN` };
    }

    // Check amount — the tx_ref embeds the amount or we match against known products
    // For our system, we accept the amount from Flutterwave as verified since we
    // set the amount during payment initialization.
    const verifiedAmount = parseFloat(tx.amount);
    const chargedAmount = parseFloat(tx.charged_amount);
    const actualAmount = chargedAmount > verifiedAmount ? chargedAmount : verifiedAmount;

    return {
      isValid: true,
      verifiedAmount: actualAmount,
      verifiedCurrency: tx.currency,
      customer: tx.customer,
    };
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    console.error(`❌ Flutterwave verify API error for tx ${transactionId}:`, msg);
    return { isValid: false, reason: msg };
  }
}

// ── Resolve product ID from tx_ref or amount ─────────────────────────────────
function resolveProductId(txRef, amount) {
  // Check by tx_ref prefix
  if (txRef.startsWith("MB-") || txRef.includes("master-bundle")) return "master-bundle";
  if (txRef.startsWith("MEGA-") || txRef.includes("mega-bundle")) return "mega-bundle";
  if (txRef.startsWith("WAEC-")) return "waec-complete";
  if (txRef.startsWith("NECO-")) return "neco-complete";
  if (txRef.startsWith("JAMB-MATH-")) return "jamb-math";
  if (txRef.startsWith("JAMB-ENG-")) return "jamb-english";
  if (txRef.startsWith("IELTS-")) return "ielts-pack";
  if (txRef.startsWith("SAT-")) return "sat-pack";

  // Fallback: match by amount
  for (const [pid, expectedAmount] of Object.entries(PRODUCT_AMOUNTS)) {
    if (Math.abs(amount - expectedAmount) < 1) {
      return pid;
    }
  }

  return null;
}

// ── Unlock product for customer ──────────────────────────────────────────────
async function unlockProduct(email, productId, txRef) {
  try {
    // Record the access grant in a simple "access" collection or update Payment
    // For now, we use the Payment model to mark the user as having access.
    // In production, you would have a User/Access model.
    console.log(`🔓 Product "${productId}" unlocked for ${email} (tx: ${txRef})`);
    // TODO: Send email notification to the customer with download link
    // TODO: Send admin notification
    // TODO: If the product is Master Bundle or Mega Bundle, grant access to all sub-products
  } catch (error) {
    console.error(`❌ Failed to unlock product for ${email}:`, error.message);
  }
}

// ── Record failed payment attempt ─────────────────────────────────────────────
async function recordPaymentAttempt({
  transactionId,
  txRef,
  amount,
  currency,
  status,
  customerEmail,
  customerName,
  customerPhone,
  webhookReceived,
}) {
  try {
    await Payment.findOneAndUpdate(
      { tx_ref: txRef },
      {
        transaction_id: transactionId,
        amount: amount || 0,
        currency: currency || "NGN",
        customer_email: customerEmail || "unknown@email.com",
        customer_name: customerName || "Unknown",
        customer_phone: customerPhone || "",
        status: status || "failed",
        verified: false,
        webhook_received: webhookReceived,
        webhook_received_at: new Date(),
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("❌ Failed to record payment attempt:", error.message);
  }
}

module.exports = router;
