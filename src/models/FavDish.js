const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FavDish = sequelize.define('FavDish', {
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
  tableName: 'FavDish',
  timestamps: true,
});

module.exports = FavDish;
