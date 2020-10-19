const jwt = require('jsonwebtoken');
let fs = require('fs');
let private = fs.readFileSync(__dirname + '/private.pem');
let public = fs.readFileSync(__dirname + '/public.pem');
const logEvent = require('../models/logEvent');
const {ObjectId} = require('mongodb')

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).send("No token found"); // if there isn't any token

  const result = jwt.verify(token, public, { algorithm: 'RS256' });
  console.log(result, "<<<<<<<<<<<<<<<<<JWT verification")
  if(result){
    const checkToken = logEvent.findOne({createdAt:result.createdAt,user: ObjectId(result._id)})

    if(!checkToken) return res.status(403).send("expired token");

    req.user = result;
    next();
  }else{
    return res.status(403).send("token verification failed");
  }
}

exports.generateAccessToken = async (user) => {
  const tokenData = {
    _id: user._id,
    name: user.name,
    platform: "web",//acquire platform info from frontend
    // userRole: user.userRole,
    createdAt: user.createdAt
  }

  return jwt.sign(tokenData, private, { algorithm: 'RS256', expiresIn: '5h' });
}
