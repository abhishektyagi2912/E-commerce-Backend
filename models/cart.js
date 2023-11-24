const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    products:[
        {
            cartItem:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },

            quantity:{
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);