
'use strict'

var express=require('express');
var MessageController =require('../controllers/message');

var router = express.Router();
var md_auth=require('../middleware/authenticated');


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/file'});


router.post('/POST_MESSAGE/:groupId', md_auth.authenticated,MessageController.addMssg);
router.delete('/DELETE_MESSAGE/:groupId/:messageId', md_auth.authenticated,MessageController.deleteMssg);
router.put('/uploadUrlFile/:messagesId',[md_upload,md_auth.authenticated], MessageController.uploadUrlFile);
router.get('/urlFile/:fileName', MessageController.urlFile);


module.exports = router; 