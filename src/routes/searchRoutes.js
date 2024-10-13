const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authenticateToken = require('../middleware/authenticateToken');
const rbac = require('../middleware/rbacMiddleware');

// Protect the searchcustomer route with the authentication middleware
router.post('/searchcustomer', authenticateToken, rbac('Admin'),searchController.renderHomePage);

module.exports = router;
