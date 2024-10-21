const mongoose = require('mongoose');

const FavDishSchema = new mongoose.Schema({
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
}, {
  collection: 'FavDish',
  timestamps: true,
});

module.exports = mongoose.model('FavDish', FavDishSchema);
