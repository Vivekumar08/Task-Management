const express = require("express");
const UserRouter = express.Router();

const user = require("../models/user");
const { generateRandomId } = require("../utils/idGeneration");

UserRouter.get('/', async (req, res) => {
    try {
        const details = await user.find();
        res.status(200).json(details)
    } catch (err) {
        res.status(500).json("Internal server err!!!", err)
    }
});
UserRouter.post('/', async (req, res) => {
    try {
        const {name, email} = req.body;
        if (!email || !name) {
            return res.status(400).json({ error: "Fill the complete form" });
        }
        const existingUser = await user.findOne({ email: email })
        if (existingUser) return res.status(400).json({ msg: "An account with this email already exists." })

        const Newuser = new user({
            name: name,
            email: email,
            userId:generateRandomId(name)
        });

        const savedUser = await Newuser.save();
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json("Internal server err!!!", err)
    }
});
UserRouter.delete('/', async (req, res) => {
    try {
        const {email} = req.body;
        const existingUser = await user.findOneAndDelete({ email: email })
        if (existingUser) return res.status(200).json({ msg: `An account with this email ${email} has been deleted succesfully.` })
        res.status(400).json({msg:`${email} does not exist in our database`})
    } catch (err) {
        res.status(500).json("Internal server err!!!", err)
    }
});

module.exports = UserRouter;