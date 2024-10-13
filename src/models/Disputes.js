const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Disputes = sequelize.define('Disputes', {
  DisputeID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ClaimID: {
    type: DataTypes.INTEGER,
  },
  Dispute: {
    type: DataTypes.STRING(45),
  },
  Status: {
    type: DataTypes.STRING(45),
  },
  AdminID: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'Disputes',
  timestamps: true,
});

module.exports = Disputes;
