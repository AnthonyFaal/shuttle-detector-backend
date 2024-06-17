const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserPassword,
  deleteUser
} = require('../controllers/userController');
const {
  validateRegistration,
  validateLogin,
  checkValidation
} = require('../utils/validators/validators');
const { verifyToken } = require('../utils/helpers/helpers');


router.post('/register', validateRegistration, checkValidation, registerUser);

router.post('/login', validateLogin, checkValidation, loginUser);

router.get('/getAll', verifyToken, getAllUsers);

router.get('getUserById/:id', verifyToken, getUserById);

// PUT /api/users/:id/updatePassword
router.put('/:id/updatePassword', verifyToken, updateUserPassword);

// DELETE /api/users/:id
router.delete('delete/:id', verifyToken, deleteUser);

module.exports = router;
