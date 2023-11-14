const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);