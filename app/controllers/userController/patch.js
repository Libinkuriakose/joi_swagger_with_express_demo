/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API to edit user
 */
/**
 * @swagger
 * path:
 *  /test/user:
 *      patch:
 *          summary: demonstration
 *          tags: [Users]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                          id: 5f69a7b0991f04286485340c
 *                          name: libin
 *                          mobile: 8281187777
 *                          email: klibin22@gmail.com
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

const bodySchema = Joi.object({
    id: Joi.string().max(24).min(24).required().description('mongoid of the user'),
    name: Joi.string().max(20).min(4).description('name'),
    mobile: Joi.number().description("mobile number"),
    email: Joi.string().description("email")
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

    //     { "name" : "A.B. Abracus" },
    // { $set: { "name" : "A.B. Abracus", "assignment" : 5}, $inc : { "points" : 5 } },
    // { sort: { "points" : 1 }, upsert:true, returnNewDocument : true }
        const user = await user.findOneAndUpdate(mongoQuery);
        console.log(user,"::::::::::::::::::::::",mongoQuery);
        res.status(200).send({message:"succesfully done", updatedData: user});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    bodySchema
};