const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RepeatOrder = sequelize.define('RepeatOrder', {
  PlanID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
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
  },
  VendorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  MenuID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
}, {
  tableName: 'RepeatOrder',
  timestamps: true,
});

module.exports = RepeatOrder;
