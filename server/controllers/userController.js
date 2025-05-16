const User = require('../models/User');
const Blog = require('../models/Blog');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ username, password: hashedPassword });
    await user.save();
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password, favorites } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const user = await User.findById(req.user._id).populate({
      path: 'favorites',
      populate: { path: 'author', select: 'username' },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.favorites);
  } catch (error) {
    console.error('Get Favorites Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  const { id } = req.params; // Blog ID
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const index = user.favorites.indexOf(id);
    if (index === -1) {
      user.favorites.push(id);
    } else {
      user.favorites.splice(index, 1);
    }
    await user.save();
    const updatedUser = await User.findById(req.user._id).populate({
      path: 'favorites',
      populate: { path: 'author', select: 'username' },
    });
    res.json(updatedUser.favorites);
  } catch (error) {
    console.error('Toggle Favorite Error:', error);
    res.status(500).json({ message: error.message });
  }
};

