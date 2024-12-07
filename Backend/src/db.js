const mongoose = require('mongoose');
require('dotenv').config(); 

const uri = process.env.MONGO_URI;


async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = { connectToDatabase, mongoose };
