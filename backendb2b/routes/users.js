'use strict'

var express = require('express');
var UserController = require('../controllers/users');


var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', UserController.home);
router.post('/test', UserController.test);
router.post('/POST_USER', UserController.saveUser);
router.get('/GET_USER/:id?', UserController.getUser);
router.get('/GET_USERS', UserController.getUsers);
router.put('/PUT_USER/:id', UserController.updateUser);
router.delete('/DELETE_USER/:id', UserController.deleteUser);
router.post('/UPLOAD_IMAGE_USER/:id', multipartMiddleware, UserController.uploadImage);
router.get('/GET-IMAGE/:image', UserController.getImageFile);

module.exports = router;