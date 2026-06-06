const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  transaction_id: {
    type: Number,
    required: true,
    unique: true,
  },
  tx_ref: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "NGN",
  },
  customer_email: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_phone: {
    type: String,
  },
  plan_name: {
    type: String,
    required: true,
  },
  product_ids: [
    {
      type: String,
    },
  ],
  payment_type: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "successful", "failed", "cancelled"],
    default: "pending",
  },
  paid_at: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verified_at: {
    type: Date,
  },
  webhook_received: {
    type: Boolean,
    default: false,
  },
  webhook_received_at: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Index for fast lookups (unique: true on fields already in schema)
paymentSchema.index({ customer_email: 1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
