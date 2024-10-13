const express = require('express');
const disputesController = require('../controllers/disputesController');
const router = express.Router();

router.post('/', disputesController.createDispute);
router.get('/', disputesController.getAllDisputes);
router.get('/:id', disputesController.getDisputeById);
router.put('/:id', disputesController.updateDispute);
router.delete('/:id', disputesController.deleteDispute);

module.exports = router;
