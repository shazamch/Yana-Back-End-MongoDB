const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  CustomerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  RiderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
    required: true,
  },
  OrderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  DeliveryDateTime: {
    type: Date,
    required: true,
  },
  Rating: {
    type: String,
    maxlength: 45,
  },
  ProofPhotoPath: {
    type: String,
    maxlength: 45,
  },
  RiderNote: {
    type: String,
    maxlength: 200,
  },
}, {
  collection: 'Delivery',
  timestamps: true,
});

// Create and export the Delivery model
const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;
