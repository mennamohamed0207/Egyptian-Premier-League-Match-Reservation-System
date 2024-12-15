const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true , match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    city: { type: String, required: true },
    address: { type: String},
    role: { type: String, enum: ['Manager', 'User'], default:'User' },
    status: { type: String,enum: ['Pending', 'Approved'], default:null },
    createdAt: { type: Date,default:Date.now},
});

async function run() {
  const conn = mongoose.createConnection();
  conn.model('User', userSchema);
  await mongoose.connect(uri);
  console.log("User Model Connected to MongoDB successfully!");
}
run();

module.exports = mongoose.model('User', userSchema);


