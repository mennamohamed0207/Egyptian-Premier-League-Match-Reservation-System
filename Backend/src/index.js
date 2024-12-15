const express = require('express');
const { connectToDatabase } = require('./db');  
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("../swagger");
const authRoutes = require('./controllers/userController'); 
const matchRoutes = require('./controllers/matchController'); 

const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/user', authRoutes);
app.use('/match', matchRoutes);


connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Swagger UI on http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Error starting the server:', err);
    process.exit(1);
  });


