const express = require('express');
const router = express.Router();
const post = require('./post')
const patch = require('./patch')
const get = require('./get')
const erase = require('./delete');
const validator = require('express-joi-validation').createValidator({})
const parser = require('body-parser');

router.post('/', parser.json(), validator.body(post.bodySchema), post.handler);

// router.get('/', parser.json(), validator.query(get.querySchema), get.handler);

// router.patch('/', parser.json(), validator.body(patch.bodySchema), patch.handler);

// router.delete('/', parser.json(), validator.query(erase.querySchema), erase.handler);



module.exports = {
    productController: router
}
