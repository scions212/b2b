'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = Schema({
	name:{ type:String, required:true, trim:true },
	lastname: { type:String, required:true, trim:true },
	email: { type:String, required:true, trim:true, unique:true },
	nph:{ type:Number, required:true, trim:true, unique:true },
	idUser:{ type:Number, required:true, trim:true, unique:true },
	image:{type:String}
},{ 	versionKey:false,
		timestamps:true

})

module.exports = mongoose.model('Contact', ContactSchema);
// projects  --> guarda los documents en la coleccion