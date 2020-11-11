'use strict'

var express=require('express');
var GroupController =require('../controllers/group');

var router = express.Router();
var md_auth=require('../middleware/authenticated');


router.post('/test2', GroupController.test);
router.post('/POST_GROUP',md_auth.authenticated, GroupController.saveGroup);
router.get('/GET_GROUPS',md_auth.authenticated, GroupController.getGroups);
router.get('/GET_GROUP/:id', GroupController.getGroup);
router.get('/GET_GROUP_USER/:usuario?',md_auth.authenticated, GroupController.getGroupByUsuario);

//metodo update a tomar en cuenta, error...
router.put('/UPDATED_GROUP/:id',md_auth.authenticated, GroupController.putGroup);
// 
router.delete('/DELETE_GROUP/:id',md_auth.authenticated, GroupController.deletetGroup);
router.get('/GET_SEARCH_GROUP/:search',md_auth.authenticated, GroupController.searchGroup);


module.exports = router; 