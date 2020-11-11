'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({

    nameChat:{ type:String, trim:true, },
    idUser:{ type: Schema.ObjectId, ref:'User' },
    idContact: { type: Schema.ObjectId, ref:'Contact' },
    urlFile:{type:String },

},{ 	versionKey:false,
        timestamps:true,
});


module.exports = mongoose.model('chat', ChatSchema);

// projects  --> guarda los documents en la coleccion