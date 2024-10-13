const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
  CustomerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Customer',
      key: 'CustomerID',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  DishID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Dishes',
      key: 'DishID',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'Cart',
  timestamps: true,
});

module.exports = Cart;
