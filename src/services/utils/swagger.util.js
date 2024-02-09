const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Parking System - REST API Docs',
      version: 1,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: ['./src/modules/**/*.module.js'],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
