// middleware/validateUser.js
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Send validation errors
    }
    next(); // Proceed to the next middleware or route handler if validation passes
  }
];

module.exports = validateUser;
