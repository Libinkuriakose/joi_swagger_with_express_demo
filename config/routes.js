const express = require('express');

const router = express.Router();
const {userController}  = require('../app/controllers/userController');
const {productController}  = require('../app/controllers/productController');
const {login} = require('../app/controllers/logIn');
const {authenticateToken} = require('../app/middlewares/jwt');

router.use('/signUp',userController);
router.use('/user',authenticateToken,userController);
router.use('/product',authenticateToken,productController);
router.use('/login',login);
module.exports = router
