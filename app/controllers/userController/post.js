/**
 * @swagger
 *  components:
 *      schemas:
 *          user:
 *              type: object
 *              required:
 *                  - name
 *                  - mobile
 *                  - email
 *                  - password
 *              properties:
 *                  name:
 *                      type: string
 *                      description: name of the user
 *                  mobile:
 *                      type: number
 *                      description: mobile number of the user
 *                  password:
 *                      type: string
 *                      description: password atleast 6 characters
 *                  email:
 *                      type: string
 *                      description: email of the user
 *              example:
 *                  name: libin
 *                  mobile: 8281187777
 *                  password: abcdefgh
 *                  email: klibin22@gmail.com
 */
/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API to manage users
 */
/**
 * @swagger
 * path:
 *  /test/signUp:
 *      post:
 *          summary: demonstration
 *          tags: [Users]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      required:
 *                          - name
 *                          - mobile
 *                          - email
*                           - password
 *                      example:
 *                          name: libin
 *                          mobile: 8281187777
 *                          email: klibin22@gmail.com
 *                          password: abcdefgh
 *                   
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
const bcrypt = require('bcrypt');

const bodySchema = Joi.object({
    name: Joi.string().required().max(20).min(4).description('name'),
    mobile: Joi.number().required().description("mobile number"),
    email: Joi.string().required().description("email"),
    password: Joi.string().max(20).min(6).required().description("password"),
})

const handler = async (req, res) => {
    try {
        const saltRounds = process.env.saltRounds || 10;
        const salt = await bcrypt.genSalt(saltRounds);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        req.body.status = 1;//1-active,2-suspended,3-banned,4-softdelete,5-harddelete
        user.insert(req.body);
        res.status(200).send("succesfully done");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    bodySchema
};