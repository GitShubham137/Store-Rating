const express = require('express');
const router = express.Router();
const {
    addStore,
    addUser,
    getDashboardStats,
    getStores,
    getUsers,
    getUserDetails,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin);

router.post('/stores', addStore);
router.post('/users', addUser);
router.get('/dashboard', getDashboardStats);
router.get('/stores', getStores);
router.get('/users', getUsers);
router.get('/users/:id', getUserDetails);

module.exports = router;
