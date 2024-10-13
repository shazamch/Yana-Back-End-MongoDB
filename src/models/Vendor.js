const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vendor = sequelize.define('Vendor', {
  VendorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-increment for primary key
  },
  Username: {
    type: DataTypes.STRING(45),
    unique: true,
  },
  Password: {
    type: DataTypes.STRING(64),
  },
  Name: {
    type: DataTypes.STRING(45),
    allowNull: false, // Set to false if Name should be required
  },
  Phone: {
    type: DataTypes.STRING(45),
    allowNull: false, // Set to false if Phone should be required
    unique: true,
  },
  Email: {
    type: DataTypes.STRING(45),
    allowNull: false, // Set to false if Email should be required
    unique: true,
  },
  Address: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  ProfilePhotoPath: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Rating: {
    type: DataTypes.DECIMAL(10, 1),
    allowNull: true,
  },
  Status: {
    type: DataTypes.STRING(45),
  },
  SecurityQuestion: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'Vendor',
  timestamps: true,
});

module.exports = Vendor;
