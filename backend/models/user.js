const mongoose = require('mongoose');

const userProfile = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
})

const user = mongoose.model('USERS', userProfile);
module.exports = user;
