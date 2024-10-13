require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB Connection URI
const uri = process.env.MONGODB_URI;

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000, // Increase timeout to 20 seconds
      });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Connection events for debugging
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Export the connection function
module.exports = connectToMongoDB;
