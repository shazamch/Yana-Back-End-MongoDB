const mongoose = require('mongoose');

const complaintsSchema = new mongoose.Schema({
  CustomerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  OrderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  AdminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  ComplaintDescription: {
    type: String,
    maxlength: 255,
    required: true,
  },
  ComplaintStatus: {
    type: String,
    maxlength: 45,
  },
  ComplaintDateTime: {
    type: Date,
    required: true,
  },
  ComplaintResolveDateTime: {
    type: Date,
  },
}, {
  collection: 'Complaints',
  timestamps: true,
});

const Complaints = mongoose.model('Complaints', complaintsSchema);

module.exports = Complaints;
