const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Create payment intent
router.post('/payment', async (req, res) => {
  try {
    const { amount, currency, items, customer } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in smallest currency unit (cents for USD, dhs for MAD)
      currency: currency || 'mad',
      metadata: {
        customer_name: customer.fullName,
        customer_email: customer.email,
        customer_phone: customer.phone,
        address: customer.address,
        city: customer.city,
        postal_code: customer.postalCode,
        items_count: items.length
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      success: true
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ 
      error: 'خطأ في معالجة الدفع',
      message: error.message 
    });
  }
});

// Confirm payment (webhook)
router.post('/payment-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('✅ Payment successful:', paymentIntent.id);
      
      // Save order to database here
      // await Order.create({ ... });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
});

module.exports = router;
