const Orders = require('../models/Orders');

exports.createOrder = async (orderData) => {
  try {
    const newOrder = new Orders(orderData); // Creating a new order instance
    await newOrder.save(); // Use save() for better compatibility with Mongoose schema validations
    return newOrder;
  } catch (error) {
    throw new Error('Error creating order: ' + error.message);
  }
};

exports.getAllOrders = async () => {
  try {
    const orders = await Orders.find(); // Retrieve all orders
    return orders;
  } catch (error) {
    throw new Error('Error retrieving orders: ' + error.message);
  }
};

exports.getOrderById = async (id) => {
  try {
    const order = await Orders.findById(id); // Retrieve order by ID
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error('Error retrieving order: ' + error.message);
  }
};

exports.updateOrder = async (id, orderData) => {
  try {
    const order = await Orders.findByIdAndUpdate(id, orderData, { new: true, runValidators: true }); // Update and return the updated order
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error('Error updating order: ' + error.message);
  }
};

exports.deleteOrder = async (id) => {
  try {
    const order = await Orders.findByIdAndDelete(id); // Find and delete order by ID
    if (!order) {
      throw new Error('Order not found');
    }
    return;
  } catch (error) {
    throw new Error('Error deleting order: ' + error.message);
  }
};
