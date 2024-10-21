const mongoose = require('mongoose');

const ClaimsSchema = new mongoose.Schema({
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
  ClaimDate: {
    type: Date,
    required: true,
  },
  Facility: {
    type: String,
    maxlength: 45,
  },
  UnitPrice: {
    type: Number,
  },
  Units: {
    type: Number,
  },
  Days: {
    type: Number,
  },
  BilledAmount: {
    type: Number,
  },
  BillDate: {
    type: Date,
  },
  BillStatus: {
    type: String,
    maxlength: 45,
  },
  AllowedAmount: {
    type: Number,
  },
  PaidAmount: {
    type: Number,
  },
  PaymentDate: {
    type: Date,
  },
  CheckNo: {
    type: String,
    maxlength: 45,
  },
}, {
  collection: 'Claims',
  timestamps: true,
});

const Claims = mongoose.model('Claims', ClaimsSchema);

module.exports = Claims;
