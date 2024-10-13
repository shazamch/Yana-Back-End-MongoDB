const express = require('express');
const ridersController = require('../controllers/ridersController');
const router = express.Router();

router.post('/', ridersController.createRider);
router.get('/', ridersController.getAllRiders);
router.get('/:id', ridersController.getRiderById);
router.put('/:id', ridersController.updateRider);
router.delete('/:id', ridersController.deleteRider);

module.exports = router;
