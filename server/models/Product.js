const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nameEn: String,
  price: Number,
  currency: {
    type: String,
    default: 'درهم'
  },
  description: String,
  descriptionEn: String,
  image: String,
  brand: String,
  color: String,
  quantity: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
