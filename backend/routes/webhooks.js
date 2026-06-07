const express = require("express");
const axios = require("axios");
const { appendPaymentRecord } = require("../services/googleSheets");
const router = express.Router();

const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
const WEBHOOK_HASH =
  process.env.FLUTTERWAVE_SECRET_HASH || process.env.WEBHOOK_SECRET_HASH;

// ── In-memory webhook idempotency cache ──────────────────────────────────────
const processedWebhookIds = new Set();

// ── POST /api/flutterwave/webhook ────────────────────────────────────────────
router.post(
  "/flutterwave/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      // ── 1. Signature verification ──────────────────────────────────────
      const signature = req.headers["verif-hash"];

      if (WEBHOOK_HASH && signature !== WEBHOOK_HASH) {
        console.warn("❌ Webhook rejected: invalid signature hash");
        return res
          .status(401)
          .json({ status: "error", message: "Invalid signature" });
      }

      // ── 2. Parse payload ──────────────────────────────────────────────
      const payload = JSON.parse(req.body.toString("utf-8"));
      const { event, data } = payload;

      console.log("📩 Webhook received:", {
        event,
        id: data?.id,
        tx_ref: data?.tx_ref,
      });

      // ── 3. Handle charge.completed only ────────────────────────────────
      if (event !== "charge.completed") {
        return res.status(200).json({ status: "success" });
      }

      const transactionId = data.id;
      const txRef = data.tx_ref;

      if (!transactionId || !txRef) {
        console.warn("⚠️ Webhook: missing transaction_id or tx_ref");
        return res.status(200).json({ status: "success" });
      }

      // ── 4. Idempotency: skip if already processed ──────────────────────
      if (processedWebhookIds.has(transactionId)) {
        console.log(`⏭️ Duplicate webhook skipped for tx ${transactionId}`);
        return res.status(200).json({ status: "success" });
      }

      // ── 5. Verify with Flutterwave LIVE API ────────────────────────────
      const verifyResponse = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${FLW_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        },
      );

      const tx = verifyResponse.data?.data;

      if (!tx) {
        console.warn(
          `⚠️ Webhook: no data from Flutterwave verify for ${transactionId}`,
        );
        return res.status(200).json({ status: "success" });
      }

      if (tx.status !== "successful" || tx.currency !== "NGN") {
        console.warn(
          `⚠️ Webhook: verification FAILED for ${txRef}: status=${tx.status}, currency=${tx.currency}`,
        );
        return res.status(200).json({ status: "success" });
      }

      // ── 6. Payment is VALID — record to Google Sheets ──────────────────
      processedWebhookIds.add(transactionId);
      console.log(`✅ Webhook: PAYMENT VERIFIED — ${txRef} (₦${tx.amount})`);

      // Determine product from tx_ref
      let productId = null;
      if (txRef.startsWith("MB-")) productId = "master-bundle";
      else if (txRef.startsWith("MEGA-")) productId = "mega-bundle";
      else if (txRef.startsWith("WAEC-")) productId = "waec-complete";
      else if (txRef.startsWith("NECO-")) productId = "neco-complete";
      else if (txRef.startsWith("IELTS-")) productId = "ielts-pack";
      else if (txRef.startsWith("SAT-")) productId = "sat-pack";

      const productName = productId
        ? txRef.startsWith("MB-")
          ? "Master Bundle"
          : txRef.startsWith("MEGA-")
            ? "Mega Bundle"
            : productId
        : "DChoice Tutoring Purchase";

      appendPaymentRecord({
        customer_name: tx.customer?.name || "N/A",
        customer_email: tx.customer?.email || "N/A",
        plan_name: productName,
        amount: parseFloat(tx.amount),
        currency: tx.currency,
        tx_ref: txRef,
        transaction_id: transactionId,
        status: "successful",
      }).catch((err) => {
        console.error("⚠️ Webhook: Google Sheets write failed:", err.message);
      });

      return res.status(200).json({ status: "success" });
    } catch (error) {
      console.error("❌ Webhook error:", error.message);
      return res.status(200).json({ status: "success" });
    }
  },
);

module.exports = router;
