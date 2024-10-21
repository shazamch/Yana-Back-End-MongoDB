const mongoose = require('mongoose');

const RepeatOrderSchema = new mongoose.Schema({
  CustomerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  DishID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Dishes',
  },
  VendorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Dishes',
  },
  MenuID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Dishes',
  },
  Status: {
    type: String,
    maxlength: 45,
    default: null,
  },
}, {
  collection: 'RepeatOrder',
  timestamps: true,
});

module.exports = mongoose.model('RepeatOrder', RepeatOrderSchema);
