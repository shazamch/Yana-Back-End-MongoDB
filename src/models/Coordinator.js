const mongoose = require('mongoose');

// Define the coordinator schema
const coordinatorSchema = new mongoose.Schema({
  Name: {
    type: String,
    maxlength: 45,
    required: false, // Name is optional
  },
  Phone: {
    type: String,
    maxlength: 45,
    required: false, // Phone is optional
  },
  Email: {
    type: String,
    maxlength: 45,
    required: false, // Email is optional
  },
}, {
  collection: 'Coordinator', // Specify the collection name
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('Coordinator', coordinatorSchema);
