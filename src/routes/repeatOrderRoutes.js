const express = require('express');
const router = express.Router();
const repeatOrderController = require('../controllers/repeatOrderController');

router.post('/', repeatOrderController.createRepeatOrder);
router.get('/', repeatOrderController.getAllRepeatOrders);
router.get('/:id', repeatOrderController.getRepeatOrderById);
router.put('/:id', repeatOrderController.updateRepeatOrder);
router.delete('/:id', repeatOrderController.deleteRepeatOrder);

module.exports = router;
