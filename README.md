# joi_swagger_with_express_demo

packages used

    @hapi/joi: ^17.1.1,
    aws-sdk: ^2.773.0,
    bcrypt: ^5.0.0,
    dotenv: ^8.2.0,
    express: ^4.17.1,
    express-joi-validation: ^4.0.4-beta.0,
    joi: ^17.1.1,
    jsonwebtoken: ^8.5.1,
    mongodb: ^3.5.9,
    multer: ^1.4.2,
    multer-s3: ^2.9.0,
    node-rsa: ^1.1.1,
    nodemon: ^2.0.4,
    swagger-jsdoc: ^4.0.0,
    swagger-ui-express: ^4.1.4


express sample CRUD apis with joi validation, swagger ui, plain mongodb

eliminated usage of mongoose, instead of creating schema and validating with that model
joi is used to validate incoming data.

swagger is used for api visualization and interaction

plain mongodb including aggreagtion

s3 bucket upload from backend

jwt included, uses RS256 algorithm
