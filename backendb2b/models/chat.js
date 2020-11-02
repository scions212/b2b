'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({

    nameChat:{ type:String, required:true, trim:true,unique:true},
    idChat: { type:Number, required:true, trim:true },
    idUser:{ type:Number, required:true, trim:true },
    urlFile:{type:String,},
},{ 	versionKey:false,
        timestamps:true,
});


module.exports = mongoose.model('chat', ChatSchema);

// projects  --> guarda los documents en la coleccion