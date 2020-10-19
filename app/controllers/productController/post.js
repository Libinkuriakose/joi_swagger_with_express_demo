/**
 * @swagger
 *  components:
 *      schemas:
 *          product:
 *              type: object
 *              required:
 *                  - name
 *                  - seller
 *                  - category
 *                  - price
 *                  - createdOn
 *                  - isActive
 *              properties:
 *                  name:
 *                      type: string
 *                      description: name of the user
 *                  category:
 *                      type: string
 *                      description: mobile number of the user
 *                  seller:
 *                      type: string
 *                      description: user/seller id
 *                  price:
 *                      type: string
 *                      description: email of the user
 *                  createdOn:
 *                      type: string
 *                      description: creation time
 *                  isActive:
 *                      type: string
 *                      description: product available or not

 *              example:
 *                  name: abc HD TV
 *                  seller: 5f69a959604b5912300d9f6d
 *                  category: electronics
 *                  price: currency
 *                  createdOn: 1600929970977
 *                  isActive: 1
 */
/**
 * @swagger
 * tags:
 *  name: products
 *  description: API to manage products
 */
/**
 * @swagger
 * path:
 *  /test/product:
 *      post:
 *          summary: demonstration
 *          tags: [products]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      required:
 *                          - name
 *                          - seller
 *                          - category
 *                          - price
 *                      example:
 *                          name: abc HD TV
 *                          seller: 5f69a959604b5912300d9f6d
 *                          category: electronics
 *                          price: string
 *                   
 *                 
 *          responses:
 *              '200':
 *                  description: succesfully created product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *              '400':
 *                  bad request
 */
// payload: {
//     email: Joi.string().email().required(),
//     password: Joi.string().alphanum().min(8).max(30).required(),
//     active: Joi.boolean(),
//     details: Joi.object().keys({
//         firstName: Joi.string().max(50),
//         lastName: Joi.string().max(50),
//         phoneNumber: Joi.number().integer().min(10).max(11),
//         billing : Joi.object().keys({
//             firstName: Joi.string().max(50),
//             lastName: Joi.string().max(50),
//             phoneNumber: Joi.string().integer().min(10).max(11),
//             address: Joi.string().alphanum(),
//             adress2: Joi.string().alphanum(),
//             postalCode: Joi.string().alphanum(),
//             city: Joi.string(),
//             state: Joi.string(),
//             country: Joi.string(),
//             stripeId: Joi.string().alphanum()
//         })
//     })
// }
const Joi = require('joi')
const product = require('../../models/product')
const objectId = require('mongodb');

const bodySchema = Joi.object({
    name: Joi.string().required().max(55).min(2).description('name of product'),
    seller: Joi.string().required().max(24).min(24).description("mongoid of seller/user"),
    category: Joi.string().required().description("category of product"),
    price: Joi.object().keys({
        currency: Joi.string().required().description("currency symbol"),
        amount: Joi.string().required().description("currency amount")
    }).required().description("price object"),
})

const handler = async (req, res) => {
    try {
        const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");//for checking mongoId
        if(!checkForHexRegExp.test(req.body.seller)) res.status(400).send({message:"invalid user/seller id"});
        req.body.createdOn = +new Date();
        req.body.isActive = 1;
        product.insert(req.body);
        res.status(200).send("succesfully created product");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    bodySchema
};