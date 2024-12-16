const { connectToDatabase } = require('../db');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

const ticketSchema = new mongoose.Schema({
    matchID: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seatRowIndex: { type: Number, required: true },
    seatColumnIndex: { type: Number, required: true },
});

async function run() {
    const conn = mongoose.createConnection();
    conn.model('Ticket', ticketSchema);
    await mongoose.connect(uri);
    console.log("Ticket Connected to MongoDB successfully!");
}
run();
module.exports = mongoose.model('Ticket', ticketSchema);
