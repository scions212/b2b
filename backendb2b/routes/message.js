'use strict'

var express = require('express');

var MessageController=require('../controllers/message');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', MessageController.home);
router.post('/test', MessageController.test);
router.post('/POST_Message', MessageController.saveMsg);
router.get('/GET_Message/:id?', MessageController.getMsg);
router.get('/GET_Messages', MessageController.getMsgs);
router.put('/PUT_Message/:id', MessageController.updateMsg);
router.delete('/DELETE_Message/:id', MessageController.deleteMsg);
router.post('/upload_image_msg/:id', multipartMiddleware, MessageController.uploadImage);
router.get('/get-image/:image', MessageController.getImageFile);

module.exports = router;