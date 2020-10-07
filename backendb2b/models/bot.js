'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BotSchema = Schema({
	id_message: Number,
	id_employee_origin: Number,
	id_employee_destiny: Number,
	message_content: String,
	date_message: Date,
	status_message_id: Number
});

module.exports = mongoose.model('Bot', BotSchema);
// projects  --> guarda los documents en la coleccion