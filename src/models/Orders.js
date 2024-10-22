const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  CustomerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  CustomerName: {
    type: String,
    maxlength: 45,
    default: null,
  },
  DishIDsList: {
    type: [{
      DishID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dishes',
        required: true,
      },
      VendorID: {
        type: Number,
        required: true,
      },
      DishName: {
        type: String,
        maxlength: 100,
        required: true,
      },
      Count: {
        type: Number,
        required: true,
      },
    }],
    default: [],
  },
  OrderInstructions: {
    type: String,
    maxlength: 45,
    default: null,
  },
  OrderCost: {
    type: Number,
    default: null,
  },
  OrderPlaceDateTime: {
    type: Date,
    default: null,
  },
  OrderCompleteDateTime: {
    type: Date,
    default: null,
  },
  DeliveryAddress: {
    type: String,
    maxlength: 200,
    default: null,
  },
  Status: {
    type: String,
    maxlength: 45,
    default: null,
  },
}, {
  collection: 'Orders',
  timestamps: true,
});

module.exports = mongoose.model('Orders', OrdersSchema);
