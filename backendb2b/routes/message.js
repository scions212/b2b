'use strict'

var express = require('express');

var MessageController=require('../controllers/message');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', MessageController.home);
router.post('/test', MessageController.test);
router.post('/POST_MESSAGE', MessageController.saveMsg);
router.get('/POST_MESSAGE/:id?', MessageController.getMsg);
router.get('/POST_MESSAGE', MessageController.getMsgs);
router.put('/POST_MESSAGE/:id', MessageController.updateMsg);
router.delete('/POST_MESSAGE/:id', MessageController.deleteMsg);
router.post('/UPLOAD_IMAGE_MESSAGE/:id', multipartMiddleware, MessageController.uploadImage);
router.get('/GET-IMAGE/:image', MessageController.getImageFile);

module.exports = router;