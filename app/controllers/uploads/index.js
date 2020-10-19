const express = require('express');
const router = express.Router();
const post = require('./imageUpload')
const validator = require('express-joi-validation').createValidator({})
// const parser = require('body-parser');

router.post('/',parser.json(),validator(post.payloadValidation), post.handler);



module.exports = {
    imageUploadController: router
}
