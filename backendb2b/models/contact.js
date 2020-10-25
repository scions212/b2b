'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = Schema({
	name: String,
	lastname: String,
	email: String,
	message: String,
	image:String,

});

module.exports = mongoose.model('Contact', ContactSchema);
// projects  --> guarda los documents en la coleccion