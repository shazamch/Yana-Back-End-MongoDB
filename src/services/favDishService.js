const FavDish = require('../models/FavDish');

exports.addFavDish = async (favDishData) => {
  try {
    const newFavDish = await FavDish.create(favDishData);
    return newFavDish;
  } catch (error) {
    throw new Error('Error adding favorite dish: ' + error.message);
  }
};

exports.getAllFavDishes = async () => {
  try {
    const favDishes = await FavDish.find(); // Use find() for Mongoose
    return favDishes;
  } catch (error) {
    throw new Error('Error retrieving favorite dishes: ' + error.message);
  }
};

exports.getFavDishById = async (id) => {
  try {
    const favDish = await FavDish.findById(id); // Use findById() for Mongoose
    if (!favDish) {
      throw new Error('Favorite dish not found');
    }
    return favDish;
  } catch (error) {
    throw new Error('Error retrieving favorite dish: ' + error.message);
  }
};

exports.updateFavDish = async (id, favDishData) => {
  try {
    const favDish = await FavDish.findById(id); // Use findById() for Mongoose
    if (!favDish) {
      throw new Error('Favorite dish not found');
    }
    Object.assign(favDish, favDishData); // Update fields
    await favDish.save(); // Save the updated favorite dish
    return favDish;
  } catch (error) {
    throw new Error('Error updating favorite dish: ' + error.message);
  }
};

exports.deleteFavDish = async (id) => {
  try {
    const favDish = await FavDish.findById(id); // Use findById() for Mongoose
    if (!favDish) {
      throw new Error('Favorite dish not found');
    }
    await favDish.remove(); // Remove the favorite dish
    return;
  } catch (error) {
    throw new Error('Error deleting favorite dish: ' + error.message);
  }
};
