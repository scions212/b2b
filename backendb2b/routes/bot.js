'use strict'

var express = require('express');
var BotController = require('../controllers/bot');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', BotController.home);
router.post('/test', BotController.test);
router.post('/save-bot', BotController.saveBot);
router.get('/bot/:id?', BotController.getBot);
router.get('/bots', BotController.getBots);
router.put('/bot/:id', BotController.updateBot);
router.delete('/bot/:id', BotController.deleteBot);
/*router.post('/upload-image/:id', multipartMiddleware, BotController.uploadImage);
router.get('/get-image/:image', BotController.getImageFile);*/

module.exports = router;