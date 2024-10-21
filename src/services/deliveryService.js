const Delivery = require('../models/Delivery');

exports.createDelivery = async (deliveryData) => {
  try {
    const newDelivery = await Delivery.create(deliveryData);
    return newDelivery;
  } catch (error) {
    throw new Error('Error creating delivery: ' + error.message);
  }
};

exports.getAllDeliveries = async () => {
  try {
    const deliveries = await Delivery.find();
    return deliveries;
  } catch (error) {
    throw new Error('Error retrieving deliveries: ' + error.message);
  }
};

exports.getDeliveryById = async (id) => {
  try {
    const delivery = await Delivery.findById(id);
    if (!delivery) {
      throw new Error('Delivery not found');
    }
    return delivery;
  } catch (error) {
    throw new Error('Error retrieving delivery: ' + error.message);
  }
};

exports.updateDelivery = async (id, deliveryData) => {
  try {
    const delivery = await Delivery.findById(id);
    if (!delivery) {
      throw new Error('Delivery not found');
    }
    await delivery.updateOne(deliveryData); // Use updateOne for Mongoose
    return delivery;
  } catch (error) {
    throw new Error('Error updating delivery: ' + error.message);
  }
};

exports.deleteDelivery = async (id) => {
  try {
    const delivery = await Delivery.findById(id);
    if (!delivery) {
      throw new Error('Delivery not found');
    }
    await delivery.deleteOne(); // Use deleteOne for Mongoose
    return;
  } catch (error) {
    throw new Error('Error deleting delivery: ' + error.message);
  }
};
