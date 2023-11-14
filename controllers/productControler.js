const Product = require("../models/product");

module.exports = {
    //create a product
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(201).json("Product has been created");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //get all products
    getAllProducts: async (req, res) => {
        try {
            res.status(200).json(await Product.find().sort({ createdAt: -1 }));
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //get a product
    getProduct: async (req, res) => {
        try {
            res.status(200).json(await Product.findById(req.params.id));
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //serach a product
    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate(
                [
                    {
                        $search: {
                            index: "shoespotter",
                            text: {
                                query: "req.params.key",
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            )
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};