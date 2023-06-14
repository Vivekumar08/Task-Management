const mongoose = require('mongoose');

const Tasks = new mongoose.Schema({
    uuserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USERS",
        required: true,
    },
    title: { type: String },
    description: { type: String },
    status: { type: Boolean, default: false }
})

const task = mongoose.model('TASKS', Tasks);
module.exports = task;