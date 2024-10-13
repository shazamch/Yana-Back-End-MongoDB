const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Delivery = sequelize.define('Delivery', {
  DeliveryID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  CustomerID: {
    type: DataTypes.INTEGER,
  },
  RiderID: {
    type: DataTypes.INTEGER,
  },
  OrderID: {
    type: DataTypes.INTEGER,
  },
  DeliveryDateTime: {
    type: DataTypes.DATE,
    allowNull: false,  // Make sure this matches your existing schema
  },
  Rating: {
    type: DataTypes.STRING(45),
  },
  ProofPhotoPath: {
    type: DataTypes.STRING(45),
  },
  RiderNote: {
    type: DataTypes.STRING(200),
  },
}, {
  tableName: 'Delivery',
  timestamps: true,
});

module.exports = Delivery;
