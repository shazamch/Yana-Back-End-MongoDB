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
    const favDishes = await FavDish.findAll();
    return favDishes;
  } catch (error) {
    throw new Error('Error retrieving favorite dishes: ' + error.message);
  }
};

exports.getFavDishById = async (id) => {
  try {
    const favDish = await FavDish.findByPk(id);
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
    const favDish = await FavDish.findByPk(id);
    if (!favDish) {
      throw new Error('Favorite dish not found');
    }
    await favDish.update(favDishData);
    return favDish;
  } catch (error) {
    throw new Error('Error updating favorite dish: ' + error.message);
  }
};

exports.deleteFavDish = async (id) => {
  try {
    const favDish = await FavDish.findByPk(id);
    if (!favDish) {
      throw new Error('Favorite dish not found');
    }
    await favDish.destroy();
    return;
  } catch (error) {
    throw new Error('Error deleting favorite dish: ' + error.message);
  }
};
