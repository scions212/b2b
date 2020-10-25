'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({

			nameCoversacion:String,
            idConversation:Number,
            idMessage:Number,
            departament : String,
            dateChat:{type: Date},
});


module.exports = mongoose.model('chat', ChatSchema);

// projects  --> guarda los documents en la coleccion