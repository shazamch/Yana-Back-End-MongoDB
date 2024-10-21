const Riders = require('../models/Riders');

exports.createRider = async (riderData) => {
  try {
    const newRider = await Riders.create(riderData); // Create a new rider
    return newRider;
  } catch (error) {
    throw new Error('Error creating rider: ' + error.message);
  }
};

exports.getAllRiders = async () => {
  try {
    const riders = await Riders.find(); // Retrieve all riders
    return riders;
  } catch (error) {
    throw new Error('Error retrieving riders: ' + error.message);
  }
};

exports.getRiderById = async (id) => {
  try {
    const rider = await Riders.findById(id); // Retrieve rider by ID
    if (!rider) {
      throw new Error('Rider not found');
    }
    return rider;
  } catch (error) {
    throw new Error('Error retrieving rider: ' + error.message);
  }
};

exports.updateRider = async (id, riderData) => {
  try {
    const rider = await Riders.findById(id); // Find the rider by ID
    if (!rider) {
      throw new Error('Rider not found');
    }
    Object.assign(rider, riderData); // Update rider details
    await rider.save(); // Save the updated rider
    return rider;
  } catch (error) {
    throw new Error('Error updating rider: ' + error.message);
  }
};

exports.deleteRider = async (id) => {
  try {
    const rider = await Riders.findById(id); // Find the rider by ID
    if (!rider) {
      throw new Error('Rider not found');
    }
    await rider.remove(); // Delete the rider
    return;
  } catch (error) {
    throw new Error('Error deleting rider: ' + error.message);
  }
};
