require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const paymentRoutes = require("./routes/payments");
const webhookRoutes = require("./routes/webhooks");
const jambRegistrationRoutes = require("./routes/jambRegistrations");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Log startup info ────────────────────────────────────────────────────────────
console.log(`🚀 Starting Dmultichoice Payment Backend`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || "production"}`);

// ── Validate critical environment variables ────────────────────────────────────
const REQUIRED_ENV_VARS = [
  { name: "FLUTTERWAVE_SECRET_KEY", desc: "Flutterwave secret key" },
  { name: "GOOGLE_SHEET_ID", desc: "Google Sheet ID" },
  { name: "GOOGLE_CLIENT_EMAIL", desc: "Google service account email" },
  { name: "GOOGLE_PRIVATE_KEY", desc: "Google service account private key" },
];

let hasMissingVars = false;
for (const v of REQUIRED_ENV_VARS) {
  if (!process.env[v.name]) {
    console.warn(`⚠️ Missing env var: ${v.name} (${v.desc})`);
    hasMissingVars = true;
  } else {
    console.log(`✅ ${v.name} — set`);
  }
}
if (process.env.GOOGLE_SHEETS_URL) {
  console.log(`✅ GOOGLE_SHEETS_URL — set (Apps Script fallback)`);
} else {
  console.warn(`⚠️ GOOGLE_SHEETS_URL — NOT set (Google Sheets fallback unavailable)`);
}
if (hasMissingVars) {
  console.warn("⚠️ Some critical env vars are missing — some features may not work.");
}

// ── Security middleware ─────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "https://tutoring.dmultichoice.com",
      "https://tutoring.dmultichoice.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "verif-hash"],
  }),
);

// ── Rate limiting ──────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

// ⚠️ Webhook must be BEFORE express.json() to get raw body for signature verification
app.use("/api", webhookRoutes);

// ── Body parsing ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ──────────────────────────────────────────────────────────────────
app.use("/api/payments", paymentRoutes);
app.use("/api/jamb-registrations", jambRegistrationRoutes.router);

// ── Health check (for Render's built-in health checker) ────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// ── Serve React SPA build (production) ─────────────────────────────────────────
const frontendBuildPath = path.join(__dirname, "..", "dist");

app.use(express.static(frontendBuildPath));

// SPA fallback: serve index.html for all non-API, non-file routes so direct URLs
// like /product/master-bundle or /product/utme-1 work when shared/bookmarked.
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) return;
  if (path.extname(req.path)) return; // has a file extension, let static handle it
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// ── 404 handler for API routes only ────────────────────────────────────────────
app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({ error: "Not found" });
  }
});

// ── Error handler ──────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error("❌ Unhandled error:", err.stack || err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start server ────────────────────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Accepting requests from: https://tutoring.dmultichoice.com`);
  console.log(`✅ Flutterwave: LIVE mode`);
  console.log(`✅ Database: Google Sheets`);
});
