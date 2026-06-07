require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

const paymentRoutes = require("./routes/payments");
const webhookRoutes = require("./routes/webhooks");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dchoice_tutoring";

// ── Connect to MongoDB ──────────────────────────────────────────────────────────
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ── Security middleware ─────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "https://tutoring.dmultichoice.com",
      "https://tutoring.dmultichoice.com",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "verif-hash"],
  })
);

// ── Rate limiting ──────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

// ⚠️ IMPORTANT: Webhook route MUST be registered BEFORE express.json() to get raw body.
// The webhook route handles its own body parsing.
// Full webhook URL: POST /api/flutterwave/webhook
app.use("/api", webhookRoutes);

// ── Body parsing (for non-webhook routes) ─────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use("/api/payments", paymentRoutes);

// ── Health checks ──────────────────────────────────────────────────────────────
// Render's built-in health checker uses GET /health by default
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// ── Error handling ─────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error("❌ Unhandled error:", err.stack || err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

// ── Start server ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🗄️  MongoDB: ${MONGODB_URI ? "configured" : "not configured"}`);
});
