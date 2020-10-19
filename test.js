const mongo = require("./config/mongo")
const express = require("express");
const app = express();
const routes = require('./config/routes');
const port = process.env.PORT;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { description } = require("joi");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Express CRUD API',
            contact: {
                name: "libin",
                email: "libinpampara@gmail.com"
            },
            version: '1.0.0',
            description: "simple demo application to showcase different types of packages and it's usage",
            servers: [
                {
                  url: "http://localhost:8000/test",
                },
            ],
        },
    },
    apis: ['./app/controllers/**/*.js','./config/routes.js'],    
}

const swaggerSpecs = swaggerJsDoc(options);
const main = (async () => {

    await mongo.connect();

})()

app.use(express.json());
app.use('/test', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(port, () => {
    console.log('listening on port', port);
});