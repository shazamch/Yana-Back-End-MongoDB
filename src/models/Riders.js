const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Riders = sequelize.define('Riders', {
  RiderID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Username: {
    type: DataTypes.STRING(45),
    unique: true,
  },
  Password: {
    type: DataTypes.STRING(64),
  },
  Phone: {
    type: DataTypes.STRING(45),
  },
  Email: {
    type: DataTypes.STRING(45),
  },
  ProfilePhotoPath: {
    type: DataTypes.STRING(45),
  },
  Address: {
    type: DataTypes.STRING(45),
  },
  Status: {
    type: DataTypes.STRING(45),
  },
  SecurityQuestion: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'Riders',
  timestamps: true,
});

module.exports = Riders;
