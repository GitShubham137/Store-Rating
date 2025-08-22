const express = require('express');
const router = express.Router();
const {
    getStores,
    submitRating,
    modifyRating,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/stores', getStores);
router.post('/ratings', submitRating);
router.put('/ratings/:id', modifyRating);

module.exports = router;
