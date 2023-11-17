const cart = require('../models/cart');
const product = require('../models/product');

module.exports = {
    addCart: async (req, res) => {
        const userId = req.userId;
        const { cartItem, quantity } = req.body;

        try {
            const cartdata = await cart.find({ userId });
            if (cart) {
                const existingProduct = cartdata.products.find((product) => product.cartItem == cartItem);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cartdata.products.push({ cartItem, quantity });
                }
                await cartdata.save();
                res.status(200).json({ message: "Product added to cart" });
            }
            else {
                const newCart = new cart({
                    userId,
                    products: [{ cartItem, quantity }]
                });
                await newCart.save();
                res.status(200).json({ message: "Product added to cart" });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    fetchCart: async (req, res) => {
        const userId = req.userId;
        try {
            const cartdata = await cart.findOne({ userId }).populate('products.cartItem');
            if (cartdata) {
                res.status(200).json({ cartdata });
            } else {
                res.status(200).json({ cartdata: [] });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteCart: async (req, res) => {
        const cartItemId = req.params.cartItem;

        try {
            const cartdata = await cart.findOne({ userId: req.userId });
            if (!cartdata)
                return res.status(400).json({ message: "Cart not found" });

            const updatedCart = cartdata.products.filter((product) => product.cartItem != cartItemId);
            cartdata.products = updatedCart;
            await cartdata.save();
            res.status(200).json({ message: "Product removed from cart" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateCart: async (req, res) => {
        const cartItemId = req.params.cartItem;
        const { quantity } = req.body;

        try {
            const cartdata = await cart.findOne({ userId: req.userId });
            if (!cartdata)
                return res.status(400).json({ message: "Cart not found" });

            const existingProduct = cartdata.products.find((product) => product.cartItem == cartItemId);
            if (existingProduct) {
                existingProduct.quantity = quantity;
            }
            await cartdata.save();
            res.status(200).json({ message: "Cart updated" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};