const express = require('express');
const connectDB = require('./db'); 
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Define a Mongoose schema and model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },

  quantity: { type: Number, default: 0 },
});

const Item = mongoose.model('Item', itemSchema);

// Routes

// Home route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// CREATE: Add a new item
app.post('/api/items', async (req, res) => {
  try {
    const { name, description, quantity } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newItem = new Item({ name, description, quantity });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ: Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    console.log(items,'items')
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ: Get a single item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE: Update an item by ID
app.put('/api/items/:id', async (req, res) => {
  try {
    const { name, description, quantity } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, quantity },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Delete an item by ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
