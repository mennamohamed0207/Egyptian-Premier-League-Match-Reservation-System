const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const Stadium = require('./stadium');
const matchSchema = new mongoose.Schema({
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    stadiumID: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: true },
    seats: {
        type: [[Number]],
        default: [] 
    },
    dateTime: { type: Date },
    mainReferee: { type: String, required: true },
    linesman1: { type: String, required: true },
    linesman2: { type: String, required: true },
});

async function run() {
    const conn = mongoose.createConnection();
    conn.model('Match', matchSchema);
    await mongoose.connect(uri);
    console.log("Match Model Connected to MongoDB successfully!");
  }
run();

module.exports = mongoose.model('Match', matchSchema);


