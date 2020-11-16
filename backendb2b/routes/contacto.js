
'use strict'

var express=require('express');
var ContactoController =require('../controllers/contacto');

var router = express.Router();
var md_auth=require('../middleware/authenticated');


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/file'});


router.post('/POST_CONTACT /:usuarioId?', md_auth.authenticated,ContactoController.addContact);
router.delete('/DELETE_CONTACT/:usuarioId/:contactosId?', md_auth.authenticated,ContactoController.deleteContac);


module.exports = router; 
