const { connectToDatabase } = require('../db');
const mongoose = require('mongoose');


const matchSchema = new mongoose.Schema({
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    stadiumID: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: true },
    seats: {
        type: [[Number]],
        required: true,
        validate: {
            validator: function(value) {
                return value.every(row => row.every(seat => seat === 0 || seat === 1));
            },
            message: 'Seats array must only contain 0s (empty) and 1s (reserved).',
        },
    },
    dateTime: { type: Date, required: true },
    mainReferee: { type: String, required: true },
    linesman1: { type: String, required: true },
    linesman2: { type: String, required: true },
});

module.exports = mongoose.model('Match', matchSchema);


