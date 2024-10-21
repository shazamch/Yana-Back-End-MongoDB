const mongoose = require('mongoose');

const DisputeSchema = new mongoose.Schema({
  ClaimID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Claims',
    required: true,
  },
  Dispute: {
    type: String,
    maxlength: 255,  // Limiting string length
    required: true,
  },
  Status: {
    type: String,
    maxlength: 45,  // Limiting string length
    required: true,
  },
  AdminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
}, {
  collection: 'Disputes',
  timestamps: true,
});

const Disputes = mongoose.model('Disputes', DisputeSchema);

module.exports = Disputes;
