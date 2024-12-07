// index.js
const express = require('express');
const { connectToDatabase } = require('./db');  

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error starting the server:', err);
    process.exit(1);
  });

  app.get('/', (req, res) => {
  res.send("Hello World! Server is running.");
});

