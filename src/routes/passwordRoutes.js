const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordControllers');
const authenticateToken = require('../middleware/authenticateToken');

// POST request to change the password
router.post('/change',authenticateToken, passwordController.changePassword);
// Initilize the process and gets the question DB to client
router.get('/forgot', authenticateToken, passwordController.getQuestion);
// Takes the answer to security question, and new password and resets the password.
router.post('/reset', authenticateToken, passwordController.resetPassword);

module.exports = router;
