'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	
           	idMessage:Number,
            messageContent : String,
			idStatusMessage : Number,
            idUser : Number,
            urlFile :String,
            dateMessage:
                {type: Date},
            
            
});

module.exports = mongoose.model('Msg', MessageSchema);


// projects  --> guarda los documents en la coleccion