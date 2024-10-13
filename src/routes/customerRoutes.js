const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/updatealldata/:customerId', customerController.updateAllData);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
