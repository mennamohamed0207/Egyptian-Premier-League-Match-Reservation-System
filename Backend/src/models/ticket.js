const { connectToDatabase } = require('../db');
const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    matchID: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seatRowIndex: { type: Number, required: true },
    seatColumnIndex: { type: Number, required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);


