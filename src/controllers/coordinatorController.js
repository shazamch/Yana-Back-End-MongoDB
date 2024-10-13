const coordinatorService = require('../services/coordinatorService');

exports.createCoordinator = async (req, res) => {
  try {
    const newCoordinator = await coordinatorService.createCoordinator(req.body);
    res.status(201).json(newCoordinator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCoordinators = async (req, res) => {
  try {
    const coordinators = await coordinatorService.getAllCoordinators();
    res.status(200).json(coordinators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCoordinatorById = async (req, res) => {
  try {
    const coordinator = await coordinatorService.getCoordinatorById(req.params.id);
    res.status(200).json(coordinator);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateCoordinator = async (req, res) => {
  try {
    const updatedCoordinator = await coordinatorService.updateCoordinator(req.params.id, req.body);
    res.status(200).json(updatedCoordinator);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteCoordinator = async (req, res) => {
  try {
    await coordinatorService.deleteCoordinator(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
