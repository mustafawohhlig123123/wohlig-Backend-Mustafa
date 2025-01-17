const mongoose = require('mongoose');


const mongoURI = 'mongodb+srv://mustafamohammed:wohlig123@cluster0.j02u1.mongodb.net/mydatabase';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
