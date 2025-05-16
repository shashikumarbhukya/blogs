const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/favorites', protect, userController.getUserFavorites);
router.post('/favorites/:id', protect, userController.toggleFavorite);

module.exports = router;