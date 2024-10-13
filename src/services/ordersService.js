const Orders = require('../models/Orders');

exports.createOrder = async (orderData) => {
  try {
    const newOrder = await Orders.create(orderData); // Creating a new order in the database
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
    const order = await Orders.findById(id); // Find the order by ID
    if (!order) {
      throw new Error('Order not found');
    }
    Object.assign(order, orderData); // Update order details
    await order.save(); // Save the updated order
    return order;
  } catch (error) {
    throw new Error('Error updating order: ' + error.message);
  }
};

exports.deleteOrder = async (id) => {
  try {
    const order = await Orders.findById(id); // Find the order by ID
    if (!order) {
      throw new Error('Order not found');
    }
    await order.remove(); // Delete the order
    return;
  } catch (error) {
    throw new Error('Error deleting order: ' + error.message);
  }
};
