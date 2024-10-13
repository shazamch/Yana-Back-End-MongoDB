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
    const cartItems = await Cart.findAll();
    return cartItems;
  } catch (error) {
    throw new Error('Error retrieving cart items: ' + error.message);
  }
};

exports.getCartItemById = async (id) => {
  try {
    const cartItem = await Cart.findByPk(id);
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
    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      throw new Error('Cart item not found');
    }
    await cartItem.update(cartData);
    return cartItem;
  } catch (error) {
    throw new Error('Error updating cart item: ' + error.message);
  }
};

exports.deleteCartItem = async (id) => {
  try {
    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      throw new Error('Cart item not found');
    }
    await cartItem.destroy();
    return;
  } catch (error) {
    throw new Error('Error deleting cart item: ' + error.message);
  }
};
