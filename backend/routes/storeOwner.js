const express = require('express');
const router = express.Router();
const { getStoreDashboard } = require('../controllers/storeOwnerController');
const { protect } = require('../middleware/authMiddleware');

const isStoreOwner = (req, res, next) => {
    if (req.user && req.user.role === 'Store Owner') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a Store Owner' });
    }
};

router.get('/dashboard', protect, isStoreOwner, getStoreDashboard);

module.exports = router;
