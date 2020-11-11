'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({

                messageContent: { type:String, required:true},
                idStatusMessage: { type:Boolean, required: { type:String, default:'false'}},
                idUser:{ type: Schema.ObjectId, ref:'User' },
                urlFile:{type:String,},
            },{ 	versionKey:false,
                    timestamps:true,
           
});

module.exports = mongoose.model('Msg', MessageSchema);


// projects  --> guarda los documents en la coleccion