
'use strict'

var express=require('express');
var MensajeController =require('../controllers/mensaje');

var router = express.Router();
var md_auth=require('../middleware/authenticated');


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/file'});


router.post('/POST_MESSAGE/:groupId', md_auth.authenticated,MensajeController.addMssg);
router.delete('/DELETE_MESSAGE/:groupId/:messageId', md_auth.authenticated,MensajeController.deleteMssg);
router.get('/GET_SEARCH_MESSAGE/:search',md_auth.authenticated, MensajeController.searchMssg);
router.put('/ACTUALIZAR_MENSAJE/:messagesId',md_auth.authenticated, MensajeController.putGroup);
router.put('/ACTUALIZAR_MENSAJES/:messagesId',md_auth.authenticated, MensajeController.updateMssg);
router.put('/uploadUrlFile/:messageId',[md_upload,md_auth.authenticated], MensajeController.uploadUrlFile);
router.put('/uploadUrlFile2/:messageId',[md_upload,md_auth.authenticated], MensajeController.uploadUrlFile2);
router.get('/urlFile/:fileName', MensajeController.urlFile);
//router.put('/PUT_MESSAGE/:messageeId', md_auth.authenticated,MensajeController.updateMssg);


module.exports = router; 