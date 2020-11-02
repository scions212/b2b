'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({


                idMessage:{ type:String, required:true, trim:true,unique:true},
                messageContent: { type:String, required:true, trim:true },
                idConversation:{ type:String, required:true, trim:true },
                idStatusMessage: { type:Boolean, required:true, trim:true, unique:true },
                idUser:{ type:String, required:true, trim:true, unique:true },
                urlFile:{type:String,},
            },{ 	versionKey:false,
                    timestamps:true,
           
});

module.exports = mongoose.model('Msg', MessageSchema);


// projects  --> guarda los documents en la coleccion