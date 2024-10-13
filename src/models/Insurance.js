const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  AuthUnitsApproved: {
    type: Number, // You might want to add a min value (e.g., 0) if necessary
  },
  CPT: {
    type: String,
    maxlength: 45,
  },
  Frequency: {
    type: String,
    maxlength: 45,
  },
  Note: {
    type: String,
    maxlength: 100,
  },
}, {
  collection: 'Insurance',
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Insurance model
const Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = Insurance;
