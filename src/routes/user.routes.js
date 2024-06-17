
const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const { validateRegistration, validateLogin, checkValidation } = require('../utils/validators/validators');
const { verifyToken } = require('../utils/helpers/helpers');

const router = express.Router();

// Register user route
router.post('/register', validateRegistration, checkValidation, registerUser);

// Login user route
router.post('/login', validateLogin, checkValidation, loginUser);

// Get all users route
router.get('/getAll', verifyToken, getAllUsers);

module.exports = router;
