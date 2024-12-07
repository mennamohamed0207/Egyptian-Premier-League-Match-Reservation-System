const { connectToDatabase } = require('./db');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: false },
    role: { type: String, required: true },
    status: { type: String, required: false },
    createdAt: { type: Date, required: true },
});


module.exports = mongoose.model('User', userSchema);


