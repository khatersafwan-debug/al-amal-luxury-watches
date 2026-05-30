const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true
  },
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  items: [{
    productId: Number,
    productName: String,
    price: Number,
    quantity: Number,
    subtotal: Number
  }],
  totalAmount: Number,
  currency: {
    type: String,
    default: 'درهم'
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: String,
  stripePaymentId: String,
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
