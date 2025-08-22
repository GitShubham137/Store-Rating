const Store = require('../models/Store');
const Rating = require('../models/Rating');

const getStoreDashboard = async (req, res) => {
    try {
        const store = await Store.findOne({ owner: req.user._id });

        if (!store) {
            return res.status(404).json({ message: 'Store not found for this owner' });
        }

        const ratings = await Rating.find({ store: store._id }).populate('user', 'name email');

        const userRatings = ratings.map(rating => ({
            userName: rating.user.name,
            userEmail: rating.user.email,
            rating: rating.rating,
        }));

        res.json({
            averageRating: store.rating,
            userRatings,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStoreDashboard,
};
