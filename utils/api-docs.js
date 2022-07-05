const express = require('express');
const router = express.Router();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Online Store API",
            description: "Online Store API information.",
            contact: {
                name: "Maor Nidam"
            },
            servers: ["http://localhost:3001"]
        }
    },
    apis: ['api-docs.js']
};

/**
 * @swagger
 * /products:
 *  get:
 *   description: Use to get all products.
 *   responses: 
 *      '200':
 *       description: Success.
 */
const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use('', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;