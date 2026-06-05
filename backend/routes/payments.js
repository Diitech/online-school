const express = require("express");
const axios = require("axios");
const router = express.Router();

const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

// Verify payment endpoint
router.post("/verify", async (req, res) => {
  console.log("=== VERIFY REQUEST RECEIVED ===");
  console.log("Body:", req.body);

  try {
    const { transaction_id, tx_ref, expected_amount } = req.body;

    if (!transaction_id || !tx_ref) {
      console.log("Missing fields:", { transaction_id, tx_ref });
      return res.status(400).json({
        success: false,
        message: "Transaction ID and TX ref are required",
      });
    }

    const flutterwaveUrl = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
    console.log("Calling Flutterwave:", flutterwaveUrl);

    const response = await axios.get(flutterwaveUrl, {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Flutterwave response:", JSON.stringify(response.data, null, 2));

    const paymentData = response.data?.data;

    if (!paymentData) {
      console.log("No paymentData in response");
      return res.status(400).json({
        success: false,
        message: "Invalid response from payment provider",
        raw: response.data,
      });
    }

    console.log("Payment status:", paymentData.status);
    console.log("Amount:", paymentData.amount, "Expected:", expected_amount);

    const isValid =
      paymentData.status === "successful" &&
      paymentData.currency === "NGN" &&
      (expected_amount === undefined || paymentData.amount >= parseFloat(expected_amount));

    console.log("Is valid?", isValid);

    if (isValid) {
      await saveToGoogleSheets({
        transaction_id: paymentData.id,
        tx_ref: paymentData.tx_ref,
        amount: paymentData.amount,
        currency: paymentData.currency,
        customer_email: paymentData.customer?.email || "N/A",
        customer_name: paymentData.customer?.name || "N/A",
        plan_name: paymentData.meta?.plan_name || "Unknown",
        status: paymentData.status,
        verified: true,
      });

      return res.json({
        success: true,
        message: "Payment verified and recorded",
        data: {
          transaction_id: paymentData.id,
          tx_ref: paymentData.tx_ref,
          amount: paymentData.amount,
          currency: paymentData.currency,
          customer: paymentData.customer,
          status: paymentData.status,
          paid_at: paymentData.paid_at,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
        data: {
          status: paymentData.status,
          amount: paymentData.amount,
          reason: paymentData.status !== "successful"
            ? "Payment not successful"
            : "Amount mismatch",
        },
      });
    }
  } catch (error) {
    console.error(
      "Payment verification error:",
      error.response?.data || error.message,
    );
    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.response?.data?.message || error.message,
    });
  }
});

// Save payment record to Google Sheets
async function saveToGoogleSheets(paymentData) {
  try {
    if (!GOOGLE_SHEETS_URL) {
      console.log("Google Sheets URL not configured, skipping save");
      return;
    }

    await axios.post(GOOGLE_SHEETS_URL, paymentData, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    console.log("Payment saved to Google Sheets");
  } catch (error) {
    console.error("Failed to save to Google Sheets:", error.message);
  }
}

// Get transaction status
router.get("/status/:transaction_id", async (req, res) => {
  try {
    const { transaction_id } = req.params;

    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({
      success: true,
      data: response.data?.data,
    });
  } catch (error) {
    console.error("Status check error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Error checking transaction status",
      error: error.response?.data?.message || error.message,
    });
  }
});

module.exports = router;