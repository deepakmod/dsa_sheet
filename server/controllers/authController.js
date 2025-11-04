const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ user: { id } }, process.env.JWT_SECRET, {
    expiresIn: '1d', 
  });
};

// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please provide name, email, and password' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'An account with this email already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = generateToken(user.id);
    res.status(201).json({ token });

  } catch (err) {
    console.error(err.message);

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ msg: messages.join(', ') });
    }

    res.status(500).send('Server error');
  }
};

// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'Email not found. Please register.' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password. Please try again.' });
    }

    const token = generateToken(user.id);
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ msg: 'User not found.' });
    }
    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};