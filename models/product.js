const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    ImageUrl: { type: [String], required: true },
    oldPrice: { type: String, required: true },
    size: {
        type: [
            {
                size: { type: String, required: true },
                isSelected: { type: Boolean, required: false, default: false },
            }

        ], required: true
    },
    price: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);