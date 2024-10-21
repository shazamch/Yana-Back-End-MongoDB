const mongoose = require('mongoose');

const dishesSchema = new mongoose.Schema({
  MenuID: {
    type: Number,
    required: true,
  },
  VendorID: {
    type: Number,
    required: true,
  },
  DishPrice: {
    type: Number,
    required: true,
  },
  DishName: {
    type: String,
    required: true,
    maxlength: 45,
  },
  DishCategory: {
    type: String,
    required: true,
    maxlength: 45,
  },
  DishDescription: {
    type: String,
    maxlength: 255,
    default: null,
  },
  DishTags: {
    type: [String],
    default: [],
  },
  DishDetails: {
    type: String,
    maxlength: 255,
    default: null,
  },
  DishRating: {
    type: mongoose.Types.Decimal128,
    default: null,
  },
  DishPhotoPath: {
    type: String,
    maxlength: 255,
    default: null,
  },
  DishStatus: {
    type: String,
    required: true,
    maxlength: 45,
  },
  NutritionInfo: {
    type: String,
    maxlength: 255,
    default: null,
  },
  Allergies: {
    type: String,
    maxlength: 255,
    default: null,
  }
}, {
  collection: 'Dishes',
  timestamps: true // Automatically add `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Dishes', dishesSchema);
