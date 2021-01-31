'use strict'

var mongoose = require('mongoose');
var app = require('./app');
const PORT = process.env.PORT || 3700;


mongoose.Promise = global.Promise;
				//mongodb://localhost:27017/Chatbot
				//mongodb+srv://JonasAndres:Miajade212.@b2bchat.zwvdu.mongodb.net/B2BChat
mongoose.connect('mongodb://localhost:27017/b2begaut',{useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(() => {
	console.log("Conexión a la base de datos establecida satisfactoriamente...");
	// Creacion del servidor
	app.listen(PORT, () => {
		console.log(`Servidor corriendo correctamente en la url: localhost:${ PORT }`);
	});
})
.catch(err => console.log(err));
