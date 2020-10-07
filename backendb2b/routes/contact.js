'use strict'

var express = require('express');
var ContactController = require('../controllers/contact');

var router = express.Router();

var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ContactController.home);
router.post('/test', ContactController.test);
router.post('/save-contact', ContactController.saveContact); 
router.get('/contact/:id?', ContactController.getContact);
router.get('/contacts', ContactController.getContact);
router.put('/contact/:id', ContactController.updateContac);
router.delete('/project/:id', ContactController.deleteContact);
/*router.post('/upload-image/:id', multipartMiddleware, BotController.uploadImage);
router.get('/get-image/:image', BotController.getImageFile);*/

module.exports = router;