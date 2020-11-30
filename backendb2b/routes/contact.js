'use strict'

var express = require('express');
var ContactController = require('../controllers/contact');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ContactController.home);
router.post('/test', ContactController.test);
router.post('/POST_CONTACT', ContactController.saveContact); 
router.get('/GET_CONTACT/:id?', ContactController.getContact);
router.get('/GET_CONTACTs', ContactController.getContact);
router.put('/PUT_CONTACT/:id', ContactController.updateContac);
router.delete('/DELETE_CONTACT/:id', ContactController.deleteContact);
router.post('/UPLOAD_IMAGE_contact/:id', multipartMiddleware, ContactController.uploadImage);
router.get('/GET_IMAGE/:image', ContactController.getImageFile);

module.exports = router;