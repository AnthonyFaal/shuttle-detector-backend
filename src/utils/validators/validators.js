const { body, validationResult } = require('express-validator');

// Validation rules for registration
const validateRegistration = [
  body('username', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

// Validation rules for login
const validateLogin = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

// Middleware to check validation results
const checkValidation = (req, res, next) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) { 
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateRegistration, validateLogin, checkValidation };
