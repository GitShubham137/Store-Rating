 const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');



const UserSchema = new mongoose.Schema({

    name: {

        type: String,

        required: true,

        minlength: 2,

        maxlength: 60,

    },

    email: {

        type: String,

        required: true,

        unique: true,

        match: [/.+\@.+\..+/, 'Please fill a valid email address'],

    },

    password: {

        type: String,

        required: true,

        minlength: 8,

        maxlength: 16,

        validate: {

            validator: function (v) {

                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(v);

            },

            message: props => `${props.value} is not a valid password! Password must be 8-16 characters, must include at least one uppercase letter, one lowercase letter, one number and one special character.`

        }

    },

    address: {

        type: String,

        maxlength: 400,

    },

    role: {

        type: String,

        enum: ['System Administrator', 'Normal User', 'Store Owner'],

        default: 'Normal User',

    },

});



UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {

        return next();

    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();

});



module.exports = mongoose.model('User', UserSchema);