const { connectToDatabase } = require('../db');
const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const userSchema = new mongoose.Schema({
    stadiumID: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
});

matchSchema.plugin(autoIncrement.plugin, { model: 'Stadium', field: 'stadiumID' });
module.exports = mongoose.model('User', userSchema);


