const RepeatOrder = require('../models/RepeatOrder');

exports.createRepeatOrder = async (repeatOrderData) => {
  try {
    const newRepeatOrder = await RepeatOrder.create(repeatOrderData); // Create a new repeat order
    return newRepeatOrder;
  } catch (error) {
    throw new Error('Error creating repeat order: ' + error.message);
  }
};

exports.getAllRepeatOrders = async () => {
  try {
    const repeatOrders = await RepeatOrder.find(); // Retrieve all repeat orders
    return repeatOrders;
  } catch (error) {
    throw new Error('Error retrieving repeat orders: ' + error.message);
  }
};

exports.getRepeatOrderById = async (id) => {
  try {
    const repeatOrder = await RepeatOrder.findById(id); // Retrieve repeat order by ID
    if (!repeatOrder) {
      throw new Error('Repeat order not found');
    }
    return repeatOrder;
  } catch (error) {
    throw new Error('Error retrieving repeat order: ' + error.message);
  }
};

exports.updateRepeatOrder = async (id, repeatOrderData) => {
  try {
    const repeatOrder = await RepeatOrder.findById(id); // Find the repeat order by ID
    if (!repeatOrder) {
      throw new Error('Repeat order not found');
    }
    Object.assign(repeatOrder, repeatOrderData); // Update repeat order details
    await repeatOrder.save(); // Save the updated repeat order
    return repeatOrder;
  } catch (error) {
    throw new Error('Error updating repeat order: ' + error.message);
  }
};

exports.deleteRepeatOrder = async (id) => {
  try {
    const repeatOrder = await RepeatOrder.findById(id); // Find the repeat order by ID
    if (!repeatOrder) {
      throw new Error('Repeat order not found');
    }
    await repeatOrder.remove(); // Delete the repeat order
    return; // No content to return
  } catch (error) {
    throw new Error('Error deleting repeat order: ' + error.message);
  }
};
