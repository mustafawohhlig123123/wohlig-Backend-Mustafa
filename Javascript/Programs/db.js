const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace <username>, <password>, and <myDatabase> with your details
    await mongoose.connect('mongodb+srv://mustafamohammed:wohlig123@cluster0.j02u1.mongodb.net/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Atlas connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
