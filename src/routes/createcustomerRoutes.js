const express = require('express');
const router = express.Router();
const createCustomerController = require('../controllers/finalizecustomerController');

// Correct the endpoint spelling here
router.post('/generatecredentials', createCustomerController.generateCredentials);

module.exports = router;
