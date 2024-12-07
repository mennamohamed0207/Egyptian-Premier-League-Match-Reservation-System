const { connectToDatabase } = require('../db');
const mongoose = require('mongoose');


const stadiumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
});

module.exports = mongoose.model('Stadium', stadiumSchema);


