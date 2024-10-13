const Coordinator = require('../models/Coordinator');

exports.createCoordinator = async (coordinatorData) => {
  try {
    const newCoordinator = await Coordinator.create(coordinatorData);
    return newCoordinator;
  } catch (error) {
    throw new Error('Error creating coordinator: ' + error.message);
  }
};

exports.getAllCoordinators = async () => {
  try {
    const coordinators = await Coordinator.find(); // Use find() instead of findAll()
    return coordinators;
  } catch (error) {
    throw new Error('Error retrieving coordinators: ' + error.message);
  }
};

exports.getCoordinatorById = async (id) => {
  try {
    const coordinator = await Coordinator.findById(id); // Use findById() for Mongoose
    if (!coordinator) {
      throw new Error('Coordinator not found');
    }
    return coordinator;
  } catch (error) {
    throw new Error('Error retrieving coordinator: ' + error.message);
  }
};

exports.updateCoordinator = async (id, coordinatorData) => {
  try {
    const coordinator = await Coordinator.findById(id); // Use findById() for Mongoose
    if (!coordinator) {
      throw new Error('Coordinator not found');
    }
    Object.assign(coordinator, coordinatorData); // Update properties
    await coordinator.save(); // Save the updated coordinator
    return coordinator;
  } catch (error) {
    throw new Error('Error updating coordinator: ' + error.message);
  }
};

exports.deleteCoordinator = async (id) => {
  try {
    const coordinator = await Coordinator.findById(id); // Use findById() for Mongoose
    if (!coordinator) {
      throw new Error('Coordinator not found');
    }
    await coordinator.remove(); // Remove the coordinator
    return; // No need to return anything
  } catch (error) {
    throw new Error('Error deleting coordinator: ' + error.message);
  }
};
