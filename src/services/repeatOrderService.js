const RepeatOrder = require('../models/RepeatOrder');

exports.createRepeatOrder = async (repeatOrderData) => {
  try {
    const newRepeatOrder = await RepeatOrder.create(repeatOrderData);
    return newRepeatOrder;
  } catch (error) {
    throw new Error('Error creating repeat order: ' + error.message);
  }
};

exports.getAllRepeatOrders = async () => {
  try {
    const repeatOrders = await RepeatOrder.findAll();
    return repeatOrders;
  } catch (error) {
    throw new Error('Error retrieving repeat orders: ' + error.message);
  }
};

exports.getRepeatOrderById = async (id) => {
  try {
    const repeatOrder = await RepeatOrder.findByPk(id);
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
    const repeatOrder = await RepeatOrder.findByPk(id);
    if (!repeatOrder) {
      throw new Error('Repeat order not found');
    }
    await repeatOrder.update(repeatOrderData);
    return repeatOrder;
  } catch (error) {
    throw new Error('Error updating repeat order: ' + error.message);
  }
};

exports.deleteRepeatOrder = async (id) => {
  try {
    const repeatOrder = await RepeatOrder.findByPk(id);
    if (!repeatOrder) {
      throw new Error('Repeat order not found');
    }
    await repeatOrder.destroy();
    return;
  } catch (error) {
    throw new Error('Error deleting repeat order: ' + error.message);
  }
};
