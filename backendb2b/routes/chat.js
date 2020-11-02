'use strict'

var express = require('express');
var ChatController = require('../controllers/chat');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ChatController.home);
router.post('/test', ChatController.test);
router.post('/POST_CHAT', ChatController.saveChat);
router.get('/GET_CHAT/:id?', ChatController.getChat);
router.get('/GET_CHATS', ChatController.getChats);
router.put('/PUT/:id', ChatController.updateChat);
router.delete('/DELETE/:id', ChatController.deleteChat);
router.post('/UPLOAD-IMAGE/:id', multipartMiddleware, ChatController.uploadImage);
router.get('/get-image/:image', ChatController.getImageFile);

module.exports = router;