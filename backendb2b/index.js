'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;


mongoose.Promise = global.Promise;
				//mongodb://localhost:27017/Chatbot
				//mongodb+srv://JonasAndres:Miajade212.@b2bchat.zwvdu.mongodb.net/B2BChat
mongoose.connect('mongodb://localhost:27017/Chatbot',{useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
        .then(() => {
        	console.log("Conexión a la base de datos establecida satisfactoriamente...");
        	// Creacion del servidor
        	app.listen(port, () => {
        		console.log("Servidor corriendo correctamente en la url: localhost:3700");
			});
        })
		.catch(err => console.log(err));
