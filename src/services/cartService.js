const Cart = require('../models/Cart');

exports.addToCart = async (cartData) => {
  try {
    const newCartItem = await Cart.create(cartData);
    return newCartItem;
  } catch (error) {
    throw new Error('Error adding item to cart: ' + error.message);
  }
};

exports.getAllCartItems = async () => {
  try {
    const cartItems = await Cart.find().populate('CustomerID DishID'); // Populate referenced documents
    return cartItems;
  } catch (error) {
    throw new Error('Error retrieving cart items: ' + error.message);
  }
};

exports.getCartItemById = async (id) => {
  try {
    const cartItem = await Cart.findById(id).populate('CustomerID DishID'); // Populate referenced documents
    if (!cartItem) {
      throw new Error('Cart item not found');
    }
    return cartItem;
  } catch (error) {
    throw new Error('Error retrieving cart item: ' + error.message);
  }
};

exports.updateCartItem = async (id, cartData) => {
  try {
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      throw new Error('Cart item not found');
    }
    Object.assign(cartItem, cartData); // Update properties
    await cartItem.save(); // Save the updated document
    return cartItem;
  } catch (error) {
    throw new Error('Error updating cart item: ' + error.message);
  }
};

exports.deleteCartItem = async (id) => {
  try {
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      throw new Error('Cart item not found');
    }
    await cartItem.remove(); // Use remove() for Mongoose
    return;
  } catch (error) {
    throw new Error('Error deleting cart item: ' + error.message);
  }
};
