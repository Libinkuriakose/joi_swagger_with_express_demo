
const Joi = require('joi');
const user = require('../../models/user');
const logEvent = require('../../models/logEvent');
const jwt = require('../../middlewares/jwt');
const bcrypt = require('bcrypt');
const {ObjectId} = require('mongodb')

const bodySchema = Joi.object({
    loginType: Joi.string().allow(1,2).required().description('type 1-> email&password login 2-> github login'),
    email: Joi.string().when('loginType',{is: 1, then: Joi.string().required()}).description("email of user"),
    password: Joi.string().when('loginType',{is: 1, then: Joi.string().required()}).description("password of user account"),
    gitData: Joi.string().when('loginType',{is: 2, then: Joi.string().required()}).description("login info provided by git")
})
const handler = async (req, res) => {
    try {

        if(req.body.loginType==1){

            const userData = await user.findOne({email:req.body.email});

            if(!userData) return res.status(400).send({message:"wrong username or password"});

            const password = await bcrypt.compare(req.body.password, userData.password);
            
            if(password==false) return res.status(400).send({message:"wrong username or password"});

            const createdAt = new Date();
            userData.createdAt = createdAt;
            const token = await jwt.generateAccessToken(userData);

            const logEventData = {
                createdAt,
                user: ObjectId(userData._id),
                type: 1,
                platform: "web",
                token
            }
            logEvent.insert(logEventData);

            res.status(200).send({message:"succesfully logged in", token});    
        }else{
            res.status(200).send({message:"succesfully logged in via github account"});
        }
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    bodySchema
};