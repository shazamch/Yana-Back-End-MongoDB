const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  CustomerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  DishID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dishes',
    required: true,
  },
}, {
  timestamps: true,
  collection: 'Cart', // Specify the collection name
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
