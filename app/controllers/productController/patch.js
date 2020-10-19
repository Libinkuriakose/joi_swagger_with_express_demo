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
 *                          - id
 *                          - name
 *                          - seller
 *                          - category
 *                          - price
 *                      example:
 *                          id: 5f69a959604b5912300d9f6d
 *                          name: abc HD TV Pro
 *                          seller: 5f69a959604b5912300d9f6d
 *                          category: electronics
 *                          price: string
 *                   
 *                 
 *          responses:
 *              '200':
 *                  description: succesfully updated product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *              '400':
 *                  bad request
 */
const Joi = require('joi')
const product = require('../../models/product')
const {ObjectId} = require('mongodb'); 

const bodySchema = Joi.object({
    id: Joi.string().max(24).min(24).required().description('mongoid of the user'),
    name: Joi.string().max(55).min(2).description('name of product'),
    seller: Joi.string().max(24).min(24).description("mongoid of seller/user"),
    category: Joi.string().description("category of product"),
    price: Joi.object().keys({
        currency: Joi.string().required().description("currency symbol"),
        amount: Joi.string().required().description("currency amount")
    }).description("price object"),
})

const handler = async (req, res) => {
    try {
        const mongoQuery = [];
        const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");//for checking mongoId
        if(!checkForHexRegExp.test(req.body.id)) res.status(400).send({message:"invalid user id"});

        mongoQuery.push({               //_id to find the user
            '_id': ObjectId(req.body.id)
        });

        delete req.body.id;

        mongoQuery.push({               //new user data for updation
            '$set' : req.body
        });

        mongoQuery.push({               //criteria of updation
            upsert:false, returnNewDocument : true
        });

        product.findOneAndUpdate(req.body);
        res.status(200).send("succesfully updated product");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    bodySchema
};