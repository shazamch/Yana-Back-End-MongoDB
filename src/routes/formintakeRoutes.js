// formintakeRoutes.js
const express = require('express');
const router = express.Router();
const formintakeController = require('../controllers/formintakeController');

router.get('/getallcustomers', formintakeController.getAllCustomersData);

// Route to get all data for a specific customer (without authentication)
router.get('/getalldata/:customerId', formintakeController.getAllData);

// Route to update data for a specific customer (without authentication)
router.put('/updatealldata/:customerId', formintakeController.updateAllData);

module.exports = router;
