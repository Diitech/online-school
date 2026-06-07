require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const paymentRoutes = require("./routes/payments");
const webhookRoutes = require("./routes/webhooks");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Log startup info ────────────────────────────────────────────────────────────
console.log(`🚀 Starting Dmultichoice Payment Backend`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || "production"}`);

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

// ── 404 handler ─────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
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
