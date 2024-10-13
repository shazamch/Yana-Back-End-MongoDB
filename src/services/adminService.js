const Admin = require('../models/Admin');

exports.createAdmin = async (adminData) => {
  try {
    const newAdmin = await Admin.create(adminData);
    return newAdmin;
  } catch (error) {
    throw new Error('Error creating admin: ' + error.message);
  }
};

exports.getAllAdmins = async () => {
  try {
    const admins = await Admin.find(); // Updated to use find()
    return admins;
  } catch (error) {
    throw new Error('Error retrieving admins: ' + error.message);
  }
};

exports.getAdminById = async (id) => {
  try {
    const admin = await Admin.findById(id); // Updated to use findById()
    if (!admin) {
      throw new Error('Admin not found');
    }
    return admin;
  } catch (error) {
    throw new Error('Error retrieving admin: ' + error.message);
  }
};

exports.updateAdmin = async (id, adminData) => {
  try {
    const admin = await Admin.findByIdAndUpdate(id, adminData, { new: true, runValidators: true }); // Updated to use findByIdAndUpdate()
    if (!admin) {
      throw new Error('Admin not found');
    }
    return admin;
  } catch (error) {
    throw new Error('Error updating admin: ' + error.message);
  }
};

exports.deleteAdmin = async (id) => {
  try {
    const admin = await Admin.findByIdAndDelete(id); // Updated to use findByIdAndDelete()
    if (!admin) {
      throw new Error('Admin not found');
    }
    return;
  } catch (error) {
    throw new Error('Error deleting admin: ' + error.message);
  }
};
