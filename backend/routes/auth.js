const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update-password', protect, updateUserPassword);

module.exports = router;
