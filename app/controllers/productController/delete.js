/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API to delete user data
 */
/**
 * @swagger
 * path:
 *  /test/user:
 *      delete:
 *          summary: demonstration
 *          tags: [Users]
 *          parameters:
 *              - name: "userId"
 *                in: "query"
 *                description: "mongoId of user to delete"
 *                type: "string"                   
 *          responses:
 *              '200':
 *                  description: succesfully deleted
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
    userId: Joi.string().max(24).min(24).required().description('mongoid of the user')
})

const handler = async (req, res) => {
    try {
        const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");//for checking mongoId
        if(!checkForHexRegExp.test(req.query.userId)) res.status(400).send({message:"invalid user id"});
        user.deleteOne({_id: ObjectId(req.query.userId)});
        res.status(200).send({message: "succesfully deleted"});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    querySchema
};