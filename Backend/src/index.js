const express = require('express');
const { connectToDatabase } = require('./db');  
const matchController = require('./controllers/matchController');
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("../swagger");
const authRoutes = require('./controllers/userController'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/match', matchController.getMatches);
app.post('/match', matchController.createMatch);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/user', authRoutes);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error starting the server:', err);
    process.exit(1);
  });


