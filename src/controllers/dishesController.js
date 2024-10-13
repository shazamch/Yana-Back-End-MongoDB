const dishesService = require('../services/dishesService');
const CustomError = require('../utils/CustomError');

exports.createDish = async (req, res, next) => {
  try {
    const { DishName, DishCategory, VendorID, DishPrice, DishDescription, DishDetails, DishTags, DishStatus, DishPhotoPath, NutritionInfo, Allergies, MenuID } = req.body;

    // Log request body for debugging purposes
    console.log('Request to create dish:', req.body);

    // Validation: Check if required fields are provided
    if (!DishName || !DishCategory || !VendorID) {
      throw new CustomError('Dish name, category, and vendor are required', 400);
    }

    const dishData = {
      DishName,
      DishCategory,
      VendorID,
      DishPrice,
      DishDescription,
      DishDetails,
      DishTags,
      DishPhotoPath,
      DishStatus,
      NutritionInfo,
      Allergies,
      MenuID
    };

    const newDish = await dishesService.createDish(dishData);
    res.status(201).json({ success: true, data: newDish });
  } catch (error) {
    console.error('Error creating dish:', error);
    next(error); // Pass the error to the errorHandler middleware
  }
};

exports.getAllDishes = async (req, res, next) => {
  try {
    const dishes = await dishesService.getAllDishes();
    res.status(200).json({ success: true, data: dishes });
  } catch (error) {
    console.error('Error retrieving dishes:', error);
    next(error); // Pass error to errorHandler middleware
  }
};

// Other controller methods...


exports.getDishById = async (req, res, next) => {
  try {
    const dish = await dishesService.getDishById(req.params.id);
    if (!dish) {
      throw new CustomError("Dish not found", 404);
    }
    res.status(200).json({ success: true, data: dish });
  } catch (error) {
    console.error("Error retrieving dish by ID:", error); // Log the error
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateDish = async (req, res, next) => {
  try {
    const updatedDish = await dishesService.updateDish(req.params.id, req.body);
    if (!updatedDish) {
      throw new CustomError("Dish not found or could not be updated", 404);
    }
    res.status(200).json({ success: true, data: updatedDish });
  } catch (error) {
    console.error("Error updating dish:", error); // Log the error
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteDish = async (req, res, next) => {
  try {
    const dish = await dishesService.deleteDish(req.params.id);
    if (!dish) {
      throw new CustomError("Dish not found or could not be deleted", 404);
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting dish:", error); // Log the error
    next(error); // Pass error to the errorHandler middleware
  }
};
