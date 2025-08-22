const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    address: {
        type: String,
        required: true,
        maxlength: 400,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Store', StoreSchema);
