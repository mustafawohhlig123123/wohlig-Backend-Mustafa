const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }, 
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
