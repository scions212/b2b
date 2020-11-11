
'use strict'

var express=require('express');
var MensajeController =require('../controllers/mensaje');

var router = express.Router();
var md_auth=require('../middleware/authenticated');


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/file'});



router.post('/POST_MESSAGE/:groupId', md_auth.authenticated,MensajeController.addMssg);
/*router.put('/PUT_MESSAGE/:messageeId', md_auth.authenticated,MensajeController.updateMssg);
router.delete('/DELETE_MESSAGE/:groupId/:messageId', md_auth.authenticated,MensajeController.deleteMssg);
router.get('/GET_SEARCH_MESSAGE/:search',md_auth.authenticated, MensajeController.searchMssg);
router.post('/UploadProfile/',[md_upload,md_auth.authenticated], MensajeController.uploadPhotoProfile);
router.get('/photoProfile/:fileName', MensajeController.photoProfile);
*/

module.exports = router; 