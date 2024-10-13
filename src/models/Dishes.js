const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Dishes = sequelize.define('Dishes', {
  MenuID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VendorID: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Corresponds to 'vendor' from the UI form
  },
  DishID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Ensure that DishID auto-increments
  },
  DishPrice: {
    type: DataTypes.INTEGER,
    allowNull: false, // Ensure that DishID auto-increments
  },
  DishName: {
    type: DataTypes.STRING(45),
    allowNull: false,  // Corresponds to 'title' from the UI form
  },
  DishCategory: {
    type: DataTypes.STRING(45),
    allowNull: false,  // Corresponds to 'category' from the UI form
  },
  DishDescription: {
    type: DataTypes.STRING(255),
    allowNull: true,  // Corresponds to 'description' from the UI form
  },
  DishTags: {
    type: DataTypes.JSON,  // Using JSON to store the meal labels (checkboxes)
    allowNull: true,       // Corresponds to 'labels' from the UI form
  },
  DishDetails: {
    type: DataTypes.STRING(255),  // Increased length for ingredients
    allowNull: true,  // Corresponds to 'ingredients' from the UI form
  },
  DishRating: {
    type: DataTypes.DECIMAL(10, 1),
    allowNull: true,
  },
  DishPhotoPath: {
    type: DataTypes.STRING(255),  // Increased length to allow for full image path
    allowNull: true,  // Corresponds to 'images' from the UI form (image path)
  },
  DishStatus: {
    type: DataTypes.STRING(45),
    allowNull: false,  // Corresponds to 'DishStatus' ('available') from the form
  },
 
  NutritionInfo: {
    type: DataTypes.STRING(255),  // Increased length for nutrition information
    allowNull: true,  // Corresponds to 'nutritionInfo' from the UI form
  },
  Allergies: {
    type: DataTypes.STRING(255),  // Increased length for allergies
    allowNull: true,  // Corresponds to 'allergies' from the UI form
  },
}, {
  tableName: 'Dishes',
  timestamps: true,  // Will add createdAt and updatedAt fields automatically
});

module.exports = Dishes;
