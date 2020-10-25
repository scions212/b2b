'use strict'

var express = require('express');
var UserController = require('../controllers/users');


var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', UserController.home);
router.post('/test', UserController.test);
router.post('/POST_User', UserController.saveUser);
router.get('/GET_User/:id?', UserController.getUser);
router.get('/GET_Users', UserController.getUsers);
router.put('/PUT_User/:id', UserController.updateUser);
router.delete('/DELETE_User/:id', UserController.deleteUser);
router.post('/upload_image_user/:id', multipartMiddleware, UserController.uploadImage);
router.get('/get-image/:image', UserController.getImageFile);

module.exports = router;