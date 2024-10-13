const express = require('express');
const exportController = require('../controllers/exportController');
const router = express.Router();

router.get('/orders', exportController.exportOrdersToExcel);

module.exports = router;
