'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

        idUser : Number,
        name : String,
        lastame : String,
        idCard : Number, 
        positionCompany:String,
        departament:String,
        photoPerfil:String, 	
});

module.exports = mongoose.model('User', userSchema);


// projects  --> guarda los documents en la coleccion