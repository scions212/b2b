'use strict'

var express = require('express');
var ChatController = require('../controllers/chat');


var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ChatController.home);
router.post('/test', ChatController.test);
router.post('/POST_Chat', ChatController.saveChat);
router.get('/bot/:id?', ChatController.getChat);
router.get('/bots', ChatController.getChats);
router.put('/bot/:id', ChatController.updateChat);
router.delete('/bot/:id', ChatController.deleteChat);
router.post('/upload-image/:id', multipartMiddleware, ChatController.uploadImage);
router.get('/get-image/:image', ChatController.getImageFile);

module.exports = router;