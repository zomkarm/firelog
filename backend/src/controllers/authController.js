const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!['client', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const apiKey = crypto.randomBytes(24).toString('hex');

    const user = await User.create({ name, email, password, role ,apiKey});

    res.status(201).json({ message: 'User registered', user: { id: user._id, name, email, role } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token, user: { id: user._id, name: user.name,email:user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};
