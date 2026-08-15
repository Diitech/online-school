const express = require("express");
const crypto = require("crypto");
const { appendJambRegistration } = require("../services/googleSheets");
const router = express.Router();

// ── JAMB registration product (server-locked price — never trust the frontend) ──
const JAMB_PRODUCT = {
  id: "jamb-holiday-lessons",
  name: "Holiday & JAMB Online Lessons Registration",
  price: 5000,
};

// ── Validation helpers ────────────────────────────────────────────────────────
function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value) {
  return (
    typeof value === "string" &&
    /^(\+?\d[\d\s-]{9,19})$/.test(value.trim())
  );
}

// ── Generate registration reference ───────────────────────────────────────────
function generateRegRef() {
  return `JAMB-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

// ── POST /api/jamb-registrations ──────────────────────────────────────────────
// Creates a registration record in Google Sheets.
//   status = "pending_payment"  → student is about to pay online
//   status = "pending_verification" → student chose bank transfer
// The record is stored BEFORE payment so the admin can track the full funnel.
router.post("/", async (req, res) => {
  try {
    const {
      student_name,
      parent_name,
      phone,
      whatsapp,
      email,
      subjects,
      payment_method,
      payment_reference = "",
      status = "pending_payment",
    } = req.body;

    // ── Validate required fields ────────────────────────────────────────
    if (!student_name || !String(student_name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Student full name is required",
      });
    }
    if (!parent_name || !String(parent_name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Parent/Guardian name is required",
      });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required",
      });
    }
    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "A valid phone number is required",
      });
    }
    if (!isValidPhone(whatsapp)) {
      return res.status(400).json({
        success: false,
        message: "A valid WhatsApp number is required",
      });
    }

    const method = payment_method === "bank_transfer" ? "bank_transfer" : "online";
    const finalStatus =
      status === "pending_verification" ||
      status === "pending_payment" ||
      status === "paid" ||
      status === "cancelled"
        ? status
        : method === "bank_transfer"
          ? "pending_verification"
          : "pending_payment";

    const regRef = generateRegRef();

    // ── Write to Google Sheets (async — do not block the response) ──────
    const record = {
      reg_ref: regRef,
      date: new Date().toISOString(),
      student_name: String(student_name).trim(),
      parent_name: String(parent_name).trim(),
      phone: String(phone).trim(),
      whatsapp: String(whatsapp).trim(),
      email: String(email).trim(),
      subjects: Array.isArray(subjects) ? subjects.join(", ") : String(subjects || ""),
      payment_method: method,
      payment_status: finalStatus,
      payment_reference: String(payment_reference || ""),
      amount: JAMB_PRODUCT.price,
    };

    appendJambRegistration(record).catch((err) => {
      console.error("⚠️ JAMB registration sheet write failed:", err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Registration recorded",
      data: {
        reg_ref: regRef,
        amount: JAMB_PRODUCT.price,
        status: finalStatus,
        product: JAMB_PRODUCT,
      },
    });
  } catch (error) {
    console.error("❌ JAMB registration error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error saving registration",
    });
  }
});

// ── POST /api/jamb-registrations/online-payment-init ─────────────────────────
// Records the moment a student starts online payment for a returned reg_ref.
router.post("/online-payment-init", async (req, res) => {
  try {
    const { reg_ref, student_name, email } = req.body;

    if (!reg_ref) {
      return res.status(400).json({ success: false, message: "reg_ref is required" });
    }

    appendJambRegistration({
      reg_ref: String(reg_ref),
      date: new Date().toISOString(),
      student_name: String(student_name || "N/A"),
      parent_name: "N/A",
      phone: "N/A",
      whatsapp: "N/A",
      email: String(email || "N/A"),
      subjects: "-",
      payment_method: "online",
      payment_status: "payment_initiated",
      payment_reference: "",
      amount: JAMB_PRODUCT.price,
    }).catch((err) => {
      console.error("⚠️ Payment-init tracking write failed:", err.message);
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("❌ Payment-init tracking error:", error.message);
    return res.status(500).json({ success: false, message: "Error tracking payment" });
  }
});

module.exports = { router, JAMB_PRODUCT };
