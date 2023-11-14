const profile = require('../models/usermodel');

module.exports = {
    getUser : async (req,res) => {
        try {
            const user = await profile.findById(req.userId);
            // console.log(req.userId);
            const {password,__v,updatedAt,createdAt, ...others} = user._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete : async (req,res) => {
        try {
            await profile.findByIdAndDelete(req.userId);
            res.status(200).json("User has been deleted");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
