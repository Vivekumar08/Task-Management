const express = require("express");
const TaskRouter = express.Router();

const task = require("../models/task");
const user = require("../models/user");

TaskRouter.get("/", async (req, res) => {
    try {
        const { userId } = req.body;
        const existingUser = await user.findOne({ userId: userId })
        const tasks = await task.find({ uuserId: existingUser._id })
        if (tasks) return res.status(200).json(tasks)

    } catch (error) {
        res.status(500).json("Internal server err!!!", err)
    }
})
TaskRouter.post("/", async (req, res) => {
    try {
        const { userId, title, description } = req.body;
        if (!title, !description) return res.status(401).json({ msg: "Fill the data properly!!!" })
        const existingUser = await user.findOne({ userId: userId })
        if (existingUser) {
            const tasks = new task({
                uuserId: existingUser,
                title,
                description,
            });
            const savedUser = await tasks.save();
            if (savedUser) return res.status(200).json(savedUser)
        } else return res.status(401).json("User not found !!")

    } catch (error) {
        res.status(500).json("Internal server err!!!", err)
    }
})

TaskRouter.put("/status", async (req, res) => {
    try {
        const id = req.query.id
        const { userId } = req.body;
        const existingUser = await user.findOne({ userId: userId })
        if (existingUser) {
            const existitngTask = await task.findOne({ _id: id, uuserId: existingUser._id })
            if (existitngTask) {
                const status = await existitngTask.updateOne({
                    $set: {
                        status: !existitngTask.status,
                    }
                })
                if (status) return res.status(200).json({ msg: `Status has been change to ${!existitngTask.status}!!` })
                res.status(400).json({ msg: "Task not found" })
            } else return res.status(402).json({ msg: "Task not found" })
        } else return res.status(401).json({ msg: "User not found !!" })
    } catch (err) {
        res.status(500).json({ err: `Internal server err!!! ${err}` })
    }
})
TaskRouter.put("/", async (req, res) => {
    try {
        const id = req.query.id
        const { title, description } = req.body;
        if (!title, !description) return res.status(401).json({ msg: "Fill the task data properly!!!" })
        const { userId } = req.body;
        const existingUser = await user.findOne({ userId: userId })
        if (existingUser) {
            const existitngTask = await task.findOneAndUpdate({ _id: id, uuserId: existingUser._id }, {
                $set: {
                    title,
                    description,
                }
            })
            if (existitngTask) return res.status(200).json({ msg: "Task has been edited!!" })
            res.status(400).json({ msg: "Task not found" })
        } else return res.status(401).json({ msg: "User not found !!" })
    } catch (err) {
        res.status(500).json({ err: `Internal server err!!! ${err}` })
    }
})

TaskRouter.delete("/", async (req, res) => {
    try {
        const id = req.query.id;
        const { userId } = req.body;
        const existingUser = await user.findOne({ userId: userId })
        if (existingUser) {
            const deletedTask = await task.findOneAndDelete({ _id: id, uuserId: existingUser._id })
            if (deletedTask) return res.status(200).json({ msg: `Task ${deletedTask.name} deleted successfully` })
            res.status(400).json({ msg: `The task does not exist in our database` })
        } else return res.status(401).json({ msg: "User not found !!" })
    } catch (err) {
        res.status(500).json({ err: `Internal server err!!! ${err}` })
    }
})


module.exports = TaskRouter