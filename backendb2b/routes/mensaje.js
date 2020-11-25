
'use strict'

var express=require('express');
var MensajeController =require('../controllers/mensaje');

var router = express.Router();
var md_auth=require('../middleware/authenticated');


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/file'});


router.post('/POST_MESSAGE/:groupId', md_auth.authenticated,MensajeController.addMssg);
router.delete('/DELETE_MESSAGE/:groupId/:messageId', md_auth.authenticated,MensajeController.deleteMssg);
router.put('/uploadUrlFile/:messagesId',[md_upload,md_auth.authenticated], MensajeController.uploadUrlFile);
router.get('/urlFile/:fileName', MensajeController.urlFile);


module.exports = router; 