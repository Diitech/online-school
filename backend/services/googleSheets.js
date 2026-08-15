const { google } = require("googleapis");

/**
 * Google Sheets Service
 *
 * Appends verified Flutterwave payment records and JAMB lesson
 * registrations to Google Sheets.
 * Uses a Google Service Account for authentication.
 *
 * Environment variables required:
 *   GOOGLE_SHEET_ID          — The ID of the Google Sheet (from its URL)
 *   GOOGLE_PROJECT_ID        — GCP project ID
 *   GOOGLE_CLIENT_EMAIL      — Service account client email
 *   GOOGLE_PRIVATE_KEY       — Service account private key (with literal \n)
 *   GOOGLE_SHEETS_URL        — Fallback: existing Google Apps Script webhook URL
 */

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const FALLBACK_URL = process.env.GOOGLE_SHEETS_URL;

const SHEET_NAME = "Sheet1";          // Tab name within the sheet
const RANGE = `${SHEET_NAME}!A:I`;    // Columns A through I

// ── Pay- ment column headers (written on first row if sheet is empty) ────────
const HEADERS = [
  "Date",
  "Customer Name",
  "Customer Email",
  "Product Name",
  "Amount",
  "Currency",
  "Transaction Reference",
  "Flutterwave Transaction ID",
  "Payment Status",
];

// ── JAMB Registration tab + headers ──────────────────────────────────────────
const JAMB_SHEET_NAME = "JAMBRegistrations";
const JAMB_RANGE = `${JAMB_SHEET_NAME}!A:N`;
const JAMB_HEADERS = [
  "Registration Reference",
  "Date",
  "Student Full Name",
  "Parent/Guardian Name",
  "Phone",
  "WhatsApp",
  "Email",
  "Subjects",
  "Payment Method",
  "Payment Status",
  "Payment Reference",
  "Amount",
  "Status",
  "Notes",
];

// ── Determine if Google Service Account credentials are available ────────────
function hasServiceAccount() {
  return !!(SHEET_ID && GOOGLE_CLIENT_EMAIL && GOOGLE_PRIVATE_KEY);
}

// ── Get authenticated Google Sheets API client ───────────────────────────────
function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

// ── Ensure headers exist in the sheet ────────────────────────────────────────
async function ensureHeaders(sheets) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1:I1`,
    });

    const existingRow = response.data.values;

    // If the first row is empty or doesn't match, write headers
    if (!existingRow || existingRow.length === 0 || existingRow[0][0] !== "Date") {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1:I1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [HEADERS],
        },
      });
      console.log("📋 Google Sheets headers written");
    }
  } catch (error) {
    // Sheet or range may not exist yet
    console.warn("⚠️ Could not ensure headers:", error.message);
  }
}

// ── Append a payment record to Google Sheets ─────────────────────────────────
async function appendPaymentRecord(paymentData) {
  const {
    customer_name = "Unknown",
    customer_email = "unknown@email.com",
    plan_name = "Unknown",
    amount = 0,
    currency = "NGN",
    tx_ref = "",
    transaction_id = "",
    status = "successful",
  } = paymentData;

  const row = [
    new Date().toISOString(),                         // A: Date
    customer_name,                                     // B: Customer Name
    customer_email,                                    // C: Customer Email
    plan_name,                                         // D: Product Name
    amount.toString(),                                 // E: Amount
    currency,                                          // F: Currency
    tx_ref,                                            // G: Transaction Reference
    transaction_id.toString(),                         // H: Flutterwave Transaction ID
    status,                                            // I: Payment Status
  ];

  // ── Primary method: Google Sheets API via Service Account ──────────────────
  if (hasServiceAccount()) {
    try {
      const sheets = getSheetsClient();
      await ensureHeaders(sheets);

      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: RANGE,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [row],
        },
      });

      console.log(`✅ Payment recorded in Google Sheets: ${tx_ref}`);
      return { success: true, method: "sheets_api" };
    } catch (error) {
      console.error(
        "❌ Google Sheets API append failed:",
        error.response?.data?.error?.message || error.message,
      );
      // Fall through to fallback method
    }
  }

  // ── Fallback method: Google Apps Script webhook URL ────────────────────────
  if (FALLBACK_URL) {
    try {
      const axios = require("axios");
      const payload = {
        timestamp: new Date().toISOString(),
        customer_name,
        customer_email,
        plan_name,
        amount,
        currency,
        tx_ref,
        transaction_id,
        status,
      };

      await axios.post(FALLBACK_URL, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });

      console.log(`✅ Payment logged via fallback sheet URL: ${tx_ref}`);
      return { success: true, method: "fallback" };
    } catch (fallbackError) {
      console.error("❌ Fallback sheet URL also failed:", fallbackError.message);
    }
  }

  console.error("❌ All Google Sheets write methods failed.");
  return { success: false, method: "none" };
}

// ── Ensure JAMBRegistrations tab + headers exist ─────────────────────────────
async function ensureJambTab(sheets) {
  const tabs = await sheets.spreadsheets.get({
    spreadsheetId: SHEET_ID,
  });
  const hasTab = tabs.data.sheets?.some(
    (s) => s.properties?.title === JAMB_SHEET_NAME,
  );

  if (!hasTab) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: { title: JAMB_SHEET_NAME },
            },
          },
        ],
      },
    });
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${JAMB_SHEET_NAME}!A1:N1`,
      valueInputOption: "RAW",
      requestBody: { values: [JAMB_HEADERS] },
    });
    console.log("📋 JAMBRegistrations tab + headers created");
  }
}

/**
 * Append a JAMB/Holiday lessons registration to Google Sheets.
 * The tab "JAMBRegistrations" is created automatically on first write.
 * Payment statuses: pending_payment | payment_initiated | pending_verification | paid | cancelled
 */
async function appendJambRegistration(registration) {
  const {
    reg_ref = "",
    date = new Date().toISOString(),
    student_name = "",
    parent_name = "",
    phone = "",
    whatsapp = "",
    email = "",
    subjects = "",
    payment_method = "online",
    payment_status = "pending_payment",
    payment_reference = "",
    amount = 5000,
  } = registration;

  const row = [
    reg_ref,
    date,
    student_name,
    parent_name,
    phone,
    whatsapp,
    email,
    subjects,
    payment_method,
    payment_status,
    payment_reference,
    amount.toString(),
    payment_status, // Status column mirrors payment status for admin filtering
    "",
  ];

  // ── Primary method: Google Sheets API via Service Account ──────────────────
  if (hasServiceAccount()) {
    try {
      const sheets = getSheetsClient();
      await ensureJambTab(sheets);

      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: JAMB_RANGE,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [row] },
      });

      console.log(`✅ JAMB registration recorded in Google Sheets: ${reg_ref}`);
      return { success: true, method: "sheets_api" };
    } catch (error) {
      console.error(
        "❌ JAMB Sheets API append failed:",
        error.response?.data?.error?.message || error.message,
      );
      // Fall through to fallback method
    }
  }

  // ── Fallback method: Google Apps Script webhook URL ────────────────────────
  if (FALLBACK_URL) {
    try {
      await require("axios").post(
        FALLBACK_URL,
        {
          tab: JAMB_SHEET_NAME,
          timestamp: date,
          reg_ref,
          student_name,
          parent_name,
          phone,
          whatsapp,
          email,
          subjects,
          payment_method,
          payment_status,
          payment_reference,
          amount,
        },
        { headers: { "Content-Type": "application/json" }, timeout: 10000 },
      );
      console.log(`✅ JAMB registration logged via fallback URL: ${reg_ref}`);
      return { success: true, method: "fallback" };
    } catch (fallbackError) {
      console.error(
        "❌ JAMB fallback sheet URL failed:",
        fallbackError.message,
      );
    }
  }

  console.error("❌ All JAMB Google Sheets write methods failed.");
  return { success: false, method: "none" };
}

module.exports = {
  appendPaymentRecord,
  appendJambRegistration,
  hasServiceAccount,
};
