
'use strict'

var express=require('express');
var ContactController =require('../controllers/contact');

var router = express.Router();
var md_auth=require('../middleware/authenticated');


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/file'});


router.post('/POST_CONTACT/:userId?', md_auth.authenticated,ContactController.addContact);
router.delete('/DELETE_CONTACT/:userId/:contactId?', md_auth.authenticated,ContactController.deleteContac);


module.exports = router; 
