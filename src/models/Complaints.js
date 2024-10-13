const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Complaints = sequelize.define('Complaints', {
  ComplaintID: {
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
  ComplaintDescription: {
    type: DataTypes.STRING(200),
  },
  ComplaintStatus: {
    type: DataTypes.STRING(45),
  },
  ComplaintDateTime: {
    type: DataTypes.DATE,
  },
  ComplaintResolveDateTime: {
    type: DataTypes.DATE,
  },
  AdminID: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'Complaints',
  timestamps: true,
});

module.exports = Complaints;

