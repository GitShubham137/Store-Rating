const Store = require('../models/Store');
const User = require('../models/User');
const Rating = require('../models/Rating');

const addStore = async (req, res) => {
    const { name, email, address, ownerId } = req.body;

    try {
        const owner = await User.findById(ownerId);
        if (!owner || owner.role !== 'Store Owner') {
            return res.status(400).json({ message: 'Invalid owner ID or user is not a Store Owner' });
        }

        const store = await Store.create({
            name,
            email,
            address,
            owner: ownerId,
        });

        res.status(201).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password,
            address,
            role,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStores = await Store.countDocuments();
        const totalRatings = await Rating.countDocuments();

        res.json({
            totalUsers,
            totalStores,
            totalRatings,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStores = async (req, res) => {
    const { name, email, address } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };

    try {
        const stores = await Store.find(filter).populate('owner', 'name');
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    const { name, email, address, role } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };
    if (role) filter.role = role;

    try {
        const users = await User.find(filter).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let userDetails = {
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            role: user.role,
        };

        if (user.role === 'Store Owner') {
            const store = await Store.findOne({ owner: user._id });
            if (store) {
                userDetails.rating = store.rating;
            }
        }

        res.json(userDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addStore,
    addUser,
    getDashboardStats,
    getStores,
    getUsers,
    getUserDetails,
};
