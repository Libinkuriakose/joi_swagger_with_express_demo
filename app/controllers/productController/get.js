/**
 * @swagger
 * tags:
 *  name: products
 *  description: API to get product data
 */
/**
 * @swagger
 * path:
 *  /test/product:
 *      get:
 *          summary: demonstration
 *          tags: [products]
 *          parameters:
 *              - name: "search"
 *                in: "query"
 *                description: "search by name/category/mongo id"
 *                type: "string"
 *              - name: "skip"
 *                in: "query"
 *                description: "user data skip limit"
 *                type: "number"
 *              - name: "limit"
 *                in: "query"
 *                description: "user data fetch limit"
 *                type: "number"
 *                   
 *          responses:
 *              '200':
 *                  description: succesfully done
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *              '400':
 *                  bad request
 */

const Joi = require('joi')
const user = require('../../models/user')
const {ObjectId} = require('mongodb'); 

const querySchema = Joi.object({
    search: Joi.string().description('search by name/category/mongo id'),
    skip: Joi.number().description("data skip"),
    limit: Joi.number().description("number of maximum items to get")
})

const handler = async (req, res) => {
    try {
        const mongoArguments = [];
        const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");//for checking mongoId

        if (checkForHexRegExp.test(req.query.search)) {

            mongoArguments.push({ '$match': { '_id': ObjectId(req.query.search) } })

        } else if (req.query.search) {

            mongoArguments.push(
                {
                    '$match': {
                        '$text': {
                            '$search': req.query.search
                        }
                    }
                }, {
                '$sort': {
                    'score': {
                        '$meta': 'textScore'
                    }
                }
            }
            )
        } else {
            mongoArguments.push({ '$match': {} });
        }
        mongoArguments.push({ '$skip': req.query.skip || 0 }, { '$limit': req.query.limit || 25 });
        // db.products.createIndex({name: "text",category: "text"}) // check text index for products created or not
        const result = await user.find(mongoArguments);
        res.status(200).send({message: "succesfully done",data: result});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    querySchema
};