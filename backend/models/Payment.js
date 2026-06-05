const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transaction_id: {
    type: Number,
    required: true,
    unique: true
  },
  tx_ref: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'NGN'
  },
  customer_email: {
    type: String,
    required: true
  },
  customer_name: {
    type: String,
    required: true
  },
  customer_phone: {
    type: String
  },
  plan_name: {
    type: String,
    required: true
  },
  payment_type: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'successful', 'failed', 'cancelled'],
    default: 'pending'
  },
  paid_at: {
    type: Date
  },
  verified: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
