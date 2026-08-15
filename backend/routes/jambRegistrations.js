const express = require("express");
const crypto = require("crypto");
const { appendJambRegistration } = require("../services/googleSheets");

const router = express.Router();

const JAMB_PRODUCT = {
  id: "jamb-holiday-lessons",
  name: "Holiday & JAMB Online Lessons Registration",
  price: 5000,
};

function isValidEmail(value) {
  return (
    typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

function isValidPhone(value) {
  return (
    typeof value === "string" &&
    /^(\+?\d[\d\s-]{9,19})$/.test(value.trim())
  );
}

function generateRegRef() {
  return `JAMB-${Date.now()}-${crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase()}`;
}

/*
 * POST /api/jamb-registrations
 *
 * Creates the JAMB registration record.
 * The registration is saved to Google Sheets asynchronously.
 * The response is returned immediately so a Google Sheets delay
 * does not prevent the student from continuing to payment.
 */
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
    } = req.body || {};

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

    const method =
      payment_method === "bank_transfer"
        ? "bank_transfer"
        : "online";

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

    const record = {
      reg_ref: regRef,
      date: new Date().toISOString(),
      student_name: String(student_name).trim(),
      parent_name: String(parent_name).trim(),
      phone: String(phone).trim(),
      whatsapp: String(whatsapp).trim(),
      email: String(email).trim(),
      subjects: Array.isArray(subjects)
        ? subjects.join(", ")
        : String(subjects || ""),
      payment_method: method,
      payment_status: finalStatus,
      payment_reference: String(payment_reference || ""),
      amount: JAMB_PRODUCT.price,
    };

    /*
     * Save to Google Sheets without blocking registration.
     * If Google Sheets fails, log the error but still allow
     * the student to continue to payment.
     */
    appendJambRegistration(record).catch((err) => {
      console.error(
        "JAMB registration Google Sheets write failed:",
        err && err.message ? err.message : err
      );
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
    console.error(
      "JAMB registration error:",
      error && error.message ? error.message : error
    );

    return res.status(500).json({
      success: false,
      message: "Could not save your registration. Please try again.",
    });
  }
});

module.exports = {
  router,
  JAMB_PRODUCT,
};
