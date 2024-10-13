// routes/potentialCustomerRoutes.js

const express = require('express');
const router = express.Router();
const potentialCustomerController = require('../controllers/potentialCustomerController');

// Route to add a new potential customer
router.post('/add', potentialCustomerController.addPotentialCustomer);

// Route to get all potential customers
router.get('/all', potentialCustomerController.getAllPotentialCustomers);

// Route to approve a potential customer
router.post('/approve/:PotentialCustomerID', potentialCustomerController.approvePotentialCustomer);

// Route to reject a potential customer
router.post('/reject/:PotentialCustomerID', potentialCustomerController.rejectPotentialCustomer);

module.exports = router;
