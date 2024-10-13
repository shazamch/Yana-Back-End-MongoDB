const Dishes = require('../models/Dishes');

exports.createDish = async (dishData) => {
  try {
    const newDish = await Dishes.create(dishData); // Creating a new dish in the database
    return newDish;
  } catch (error) {
    throw new Error('Error creating dish: ' + error.message);
  }
};

exports.getAllDishes = async () => {
  try {
    const dishes = await Dishes.find(); // Retrieve all dishes
    return dishes;
  } catch (error) {
    throw new Error('Error retrieving dishes: ' + error.message);
  }
};

exports.getDishById = async (id) => {
  try {
    const dish = await Dishes.findById(id); // Retrieve dish by ID
    if (!dish) {
      throw new Error('Dish not found');
    }
    return dish;
  } catch (error) {
    throw new Error('Error retrieving dish: ' + error.message);
  }
};

exports.updateDish = async (id, dishData) => {
  try {
    const dish = await Dishes.findById(id); // Find the dish by ID
    if (!dish) {
      throw new Error('Dish not found');
    }
    Object.assign(dish, dishData); // Update dish details
    await dish.save(); // Save the updated dish
    return dish;
  } catch (error) {
    throw new Error('Error updating dish: ' + error.message);
  }
};

exports.deleteDish = async (id) => {
  try {
    const dish = await Dishes.findById(id); // Find the dish by ID
    if (!dish) {
      throw new Error('Dish not found');
    }
    await dish.remove(); // Delete the dish
    return;
  } catch (error) {
    throw new Error('Error deleting dish: ' + error.message);
  }
};
