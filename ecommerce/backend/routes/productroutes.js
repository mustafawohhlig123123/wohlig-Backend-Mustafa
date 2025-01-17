const express = require('express');
const Product = require('../models/product');
const { checkAdminRole } = require('../middleware/authmiddleware'); // Admin role check

const router = express.Router();

// CREATE a new product (Admin only)
router.post('/add', checkAdminRole, async (req, res) => {
  const { name, description, price, quantity, category, imageUrl } = req.body;
console.log("inside my routr");

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
      imageUrl
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

// READ all products (Admin and User accessible)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// UPDATE a product (Admin only)
router.put('/update/:id', checkAdminRole, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, category, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      quantity,
      category,
      imageUrl
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE a product (Admin only)
router.delete('/delete/:id', checkAdminRole, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;
