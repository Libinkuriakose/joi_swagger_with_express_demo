require('dotenv').config();
const fs = require('fs');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 2048});
var path = process.cwd();
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

fs.writeFile(path+"/app/middlewares/public.pem", publicKey, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("public.pem file created/updated");
});

fs.writeFile(path+"/app/middlewares/private.pem", privateKey, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("private.pem file created/updated");
});