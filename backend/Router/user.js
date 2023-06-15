const express = require("express");
const UserRouter = express.Router();

const user = require("../models/user");
const task = require("../models/task");
const { generateRandomId } = require("../utils/idGeneration");

UserRouter.get('/', async (req, res) => {
    try {
        const details = await user.find();
        res.status(200).json(details)
    } catch (err) {
        res.status(500).json("Internal server err!!!", err)
    }
});
UserRouter.post('/login', async (req, res) => {
    try {
        const { userId } = req.body;
        const details = await user.findOne({ userId: userId });
        if (details) return res.status(200).json({ name: details.name, userId: details.userId, email: details.email })
        res.status(400).json({ msg: "User not found !!" })
    } catch (err) {
        res.status(500).json("Internal server err!!!", err)
    }
});
UserRouter.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!email || !name) {
            return res.status(400).json({ error: "Fill the complete form" });
        }
        const existingUser = await user.findOne({ email: email })
        if (existingUser) return res.status(400).json({ msg: "An account with this email already exists." })

        const Newuser = new user({
            name: name,
            email: email,
            userId: generateRandomId(name)
        });

        const details = await Newuser.save();
        res.status(200).json({ name: details.name, userId: details.userId, email: details.email })
    } catch (err) {
        res.status(500).json("Internal server err!!!", err)
    }
});
UserRouter.delete('/', async (req, res) => {
    try {
        const userId = req.query.id;
        const existingUser = await user.findOneAndDelete({ userId: userId })
        if (existingUser) {
            await task.deleteMany({ uuserId: existingUser._id })
            return res.status(200).json({ msg: `An account with this UserId ${userId} has been deleted succesfully.` })
        }
        res.status(400).json({ msg: `${userId} does not exist in our database` })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Internal server err!!!" })
    }
});

module.exports = UserRouter;