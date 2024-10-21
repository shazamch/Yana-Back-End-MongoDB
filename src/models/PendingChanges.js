const mongoose = require('mongoose');

// Define the schema for PendingChanges
const pendingChangesSchema = new mongoose.Schema({
  CustomerID: {
    type: mongoose.Schema.Types.ObjectId, // Assuming CoordinatorID refers to another document
    ref: 'Customer', // Reference to the Coordinator model
  },
  Field: {
    type: String,
    maxlength: 45,
    required: true,
  },
  PreviousValue: {
    type: String,
    maxlength: 255,
  },
  NewValue: {
    type: String,
    maxlength: 255,
  },
  Status: {
    type: String,
    maxlength: 45,
    default: 'Pending',
  },
}, {
  collection: 'PendingChanges', // Specify the collection name
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('PendingChanges', pendingChangesSchema);
