const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import DB connection logic
const authRoutes = require('./routes/authRoutes'); 
const productRoutes = require('./routes/productroutes');

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

connectDB();

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/products', productRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
