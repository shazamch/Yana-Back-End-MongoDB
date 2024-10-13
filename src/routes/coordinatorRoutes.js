const express = require('express');
const router = express.Router();
const coordinatorController = require('../controllers/coordinatorController');

router.post('/', coordinatorController.createCoordinator);
router.get('/', coordinatorController.getAllCoordinators);
router.get('/:id', coordinatorController.getCoordinatorById);
router.put('/:id', coordinatorController.updateCoordinator);
router.delete('/:id', coordinatorController.deleteCoordinator);

module.exports = router;
