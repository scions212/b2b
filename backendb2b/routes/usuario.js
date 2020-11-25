'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');


var router = express.Router();
var md_auth=require('../middleware/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'});

 
router.get('/home1', UsuarioController.home);
router.post('/test1', UsuarioController.test);
router.get('/GET_USUARIOS', UsuarioController.getUsuarios);
router.get('/GET_USUARIO/:usuarioId', UsuarioController.getUsuario);
router.post('/POST_USUARIO', UsuarioController.save);
router.post('/POST_LOGIN', UsuarioController.login);
router.put('/PUT_USUARIO/:usuarioId', md_auth.authenticated, UsuarioController.update);
router.delete('/DELETE_USUARIO/:usuarioId', md_auth.authenticated, UsuarioController.deleteUsusario );
router.post('/UploadProfile/:usuarioId',[md_upload,md_auth.authenticated], UsuarioController.uploadPhotoProfile);
router.get('/photoProfile/:fileName', UsuarioController.photoProfile);


module.exports = router;

