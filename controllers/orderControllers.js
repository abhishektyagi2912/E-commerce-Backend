const Orders = require('../models/orders');

module.exports = {
    getUserOrders: async (req, res) => {
        try {
            const orders = await Orders.find({ userId: req.userId })
                .populate({
                    path: 'products.productId',
                    select: '-size -oldprice -description'
                }).exec();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};