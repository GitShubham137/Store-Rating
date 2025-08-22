const Store = require('../models/Store');
const Rating = require('../models/Rating');

const getStores = async (req, res) => {
    const { name, address } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };

    try {
        const stores = await Store.find(filter).populate('owner', 'name');
        const storesWithUserRating = await Promise.all(
            stores.map(async (store) => {
                const userRating = await Rating.findOne({
                    user: req.user._id,
                    store: store._id,
                });
                return {
                    ...store.toObject(),
                    userSubmittedRating: userRating ? userRating.rating : null,
                };
            })
        );
        res.json(storesWithUserRating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const submitRating = async (req, res) => {
    const { storeId, rating } = req.body;

    try {
        const existingRating = await Rating.findOne({
            user: req.user._id,
            store: storeId,
        });

        if (existingRating) {
            return res.status(400).json({ message: 'You have already rated this store' });
        }

        const newRating = await Rating.create({
            user: req.user._id,
            store: storeId,
            rating,
        });

        // Update store's overall rating
        const ratings = await Rating.find({ store: storeId });
        const avgRating = ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length;
        await Store.findByIdAndUpdate(storeId, { rating: avgRating });

        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const modifyRating = async (req, res) => {
    const { rating } = req.body;

    try {
        const ratingToUpdate = await Rating.findById(req.params.id);

        if (!ratingToUpdate) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        if (ratingToUpdate.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        ratingToUpdate.rating = rating;
        await ratingToUpdate.save();

        // Update store's overall rating
        const ratings = await Rating.find({ store: ratingToUpdate.store });
        const avgRating = ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length;
        await Store.findByIdAndUpdate(ratingToUpdate.store, { rating: avgRating });

        res.json(ratingToUpdate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStores,
    submitRating,
    modifyRating,
};
