const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/helpers/helpers');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username is already taken
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'Username is already taken' });
    }

    // Check if the email is already registered
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email is already registered' });
    }

    // If username and email are unique, proceed to create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    // Generate JWT token for the registered user
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getUserById = async (req, res) => {
  // Implementation for getting a user by ID
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    // Find the user by ID
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating user password:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = { registerUser, loginUser, getAllUsers, getUserById,  updateUserPassword,   deleteUser };
