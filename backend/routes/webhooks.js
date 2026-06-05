const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Flutterwave webhook endpoint
router.post('/flutterwave', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    // Verify webhook signature (if configured)
    const signature = req.headers['verif-hash'];
    const secretHash = process.env.WEBHOOK_SECRET;

    if (secretHash && signature !== secretHash) {
      console.warn('Invalid webhook signature');
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }

    // Parse the webhook payload
    const payload = JSON.parse(req.body);
    console.log('Webhook received:', payload);

    const { event, data } = payload;

    // Handle different events
    switch (event) {
      case 'charge.completed':
        await handleChargeCompleted(data);
        break;
      
      case 'transfer.completed':
        await handleTransferCompleted(data);
        break;
      
      default:
        console.log(`Unhandled event type: ${event}`);
    }

    // Always return 200 to Flutterwave
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    // Still return 200 to prevent retries
    res.status(200).json({ success: true });
  }
});

// Handle successful charge
async function handleChargeCompleted(data) {
  console.log('Payment completed:', {
    id: data.id,
    tx_ref: data.tx_ref,
    amount: data.amount,
    status: data.status,
    customer: data.customer.email
  });

  // TODO: Update database
  // TODO: Send confirmation email
  // TODO: Grant access to course/content
  // TODO: Notify admin
}

// Handle transfer completion
async function handleTransferCompleted(data) {
  console.log('Transfer completed:', data);
}

module.exports = router;
