const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, customerController.createCustomer);
router.get('/', authenticateToken, customerController.getAllCustomers);
router.get('/:id', authenticateToken, customerController.getCustomerById);
router.put('/updatealldata/:customerId', authenticateToken, customerController.updateAllData);
router.delete('/:id', authenticateToken, customerController.deleteCustomer);

module.exports = router;
