const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
openapi: "3.0.0",
info: {
title: "Egyptian Premiere League Match Reservation System",
version: "1.0.0",
description: "API documentation for Egyptian Premiere League Match Reservation System",
},
servers: [
    {
      url: 'http://localhost:3000',
      description: 'base backend server',
    },
  ],
};

const options = {
swaggerDefinition,
apis: ["./src/controllers/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;