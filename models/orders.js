const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    customerId: {
        type: String,
        required: true,
        trim: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    subtotal: {
        type: Number,
        required: true,
    },
    delivery_status: {
        type: String,
        required: true,
    },
    payment_status: {
        type: String,
        required: true,
        default: 'pending'
    },
    total: {
        type: Number,
        required: true,
    }

    
}, { timestamps: true });

module.exports = mongoose.model('Orders', ordersSchema);