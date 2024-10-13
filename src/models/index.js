// models/index.js

const sequelize = require('../config/db');
const Coordinator = require('./Coordinator');
const Insurance = require('./Insurance');
const Customer = require('./Customer');
const Admin = require('./Admin');
const Vendor = require('./Vendor');
const Dishes = require('./Dishes');
const Orders = require('./Orders');
const RepeatOrder = require('./RepeatOrder');
const Complaints = require('./Complaints');
const Cart = require('./Cart');
const FavDish = require('./FavDish');
const Claims = require('./Claims');
const Disputes = require('./Disputes');
const Riders = require('./Riders');
const Delivery = require('./Delivery');
const PendingChanges = require('./PendingChanges');
const PotentialCustomer = require('./PotentialCustomer');

// Define associations
Customer.belongsTo(Coordinator, { foreignKey: 'CoordinatorID' });
Customer.belongsTo(Insurance, { foreignKey: 'InsuranceID' });

Customer.hasMany(PendingChanges, { foreignKey: 'CustomerID' });
PendingChanges.belongsTo(Customer, { foreignKey: 'CustomerID' });

Orders.belongsTo(Customer, { foreignKey: 'CustomerID' });

RepeatOrder.belongsTo(Customer, { foreignKey: 'CustomerID' });
RepeatOrder.belongsTo(Dishes, { foreignKey: 'DishID' });
RepeatOrder.belongsTo(Vendor, { foreignKey: 'VendorID' });

Complaints.belongsTo(Customer, { foreignKey: 'CustomerID' });
Complaints.belongsTo(Orders, { foreignKey: 'OrderID' });
Complaints.belongsTo(Admin, { foreignKey: 'AdminID' });

Cart.belongsTo(Customer, { foreignKey: 'CustomerID' });
Cart.belongsTo(Dishes, { foreignKey: 'DishID' });

FavDish.belongsTo(Customer, { foreignKey: 'CustomerID' });
FavDish.belongsTo(Dishes, { foreignKey: 'DishID' });

Claims.belongsTo(Customer, { foreignKey: 'CustomerID' });
Claims.belongsTo(Orders, { foreignKey: 'OrderID' });

Disputes.belongsTo(Claims, { foreignKey: 'ClaimID' });
Disputes.belongsTo(Admin, { foreignKey: 'AdminID' });

Delivery.belongsTo(Customer, { foreignKey: 'CustomerID' });
Delivery.belongsTo(Riders, { foreignKey: 'RiderID' });
Delivery.belongsTo(Orders, { foreignKey: 'OrderID' });

// Associations for PotentialCustomers
PotentialCustomer.belongsTo(Coordinator, { foreignKey: 'CoordinatorID' });
PotentialCustomer.belongsTo(Insurance, { foreignKey: 'InsuranceID' });

module.exports = {
  sequelize,
  Coordinator,
  Insurance,
  Customer,
  Admin,
  Vendor,
  Dishes,
  Orders,
  RepeatOrder,
  Complaints,
  Cart,
  FavDish,
  Claims,
  Disputes,
  Riders,
  Delivery,
  PendingChanges,
  PotentialCustomer,
};
