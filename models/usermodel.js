const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false, // By default the user is not verified
    },
    verificationToken: String, // Store the verification token
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
