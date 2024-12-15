const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

const stadiumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
});
async function run() {
    const conn = mongoose.createConnection();
    conn.model('Stadium', stadiumSchema);
    await mongoose.connect(uri);
    console.log("Stadium Model Connected to MongoDB successfully!");
  }
run();

module.exports = mongoose.model('Stadium', stadiumSchema);


