const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Claims = sequelize.define('Claims', {
  ClaimID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  CustomerID: {
    type: DataTypes.INTEGER,
  },
  OrderID: {
    type: DataTypes.INTEGER,
  },
  ClaimDate: {
    type: DataTypes.DATE,
  },
  Facility: {
    type: DataTypes.STRING(45),
  },
  UnitPrice: {
    type: DataTypes.INTEGER,
  },
  Units: {
    type: DataTypes.INTEGER,
  },
  Days: {
    type: DataTypes.INTEGER,
  },
  BilledAmount: {
    type: DataTypes.INTEGER,
  },
  BillDate: {
    type: DataTypes.DATE,
  },
  BillStatus: {
    type: DataTypes.STRING(45),
  },
  AllowedAomunt: {
    type: DataTypes.INTEGER,
  },
  PaidAmount: {
    type: DataTypes.INTEGER,
  },
  PaymentDate: {
    type: DataTypes.DATE,
  },
  CheckNo: {
    type: DataTypes.STRING(45),
  },
}, {
  tableName: 'Claims',
  timestamps: true,
});

module.exports = Claims;
