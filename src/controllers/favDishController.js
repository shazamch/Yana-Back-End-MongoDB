const favDishService = require('../services/favDishService');
const CustomError = require('../utils/CustomError');

exports.addFavDish = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.userId || !req.body.dishId) {
      throw new CustomError('User ID and Dish ID are required', 400);
    }

    const newFavDish = await favDishService.addFavDish(req.body);
    res.status(201).json({ success: true, data: newFavDish });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllFavDishes = async (req, res, next) => {
  try {
    const favDishes = await favDishService.getAllFavDishes();
    res.status(200).json({ success: true, data: favDishes });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getFavDishById = async (req, res, next) => {
  try {
    const favDish = await favDishService.getFavDishById(req.params.id);
    if (!favDish) {
      throw new CustomError('Favorite dish not found', 404);
    }
    res.status(200).json({ success: true, data: favDish });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateFavDish = async (req, res, next) => {
  try {
    const updatedFavDish = await favDishService.updateFavDish(req.params.id, req.body);
    if (!updatedFavDish) {
      throw new CustomError('Favorite dish not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedFavDish });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteFavDish = async (req, res, next) => {
  try {
    const deleted = await favDishService.deleteFavDish(req.params.id);
    if (!deleted) {
      throw new CustomError('Favorite dish not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
