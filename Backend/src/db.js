const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); 

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    return client.db(); 
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
}

module.exports = { connectToDatabase, client };
