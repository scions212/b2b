'use strict'

var Chat = require('../models/chat');

var fs = require('fs');
var path = require('path');

var controller = {
	
	home: function(req, res){
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador de bot"
		});
	},

	saveChat: function(req, res){
		var chat = new Chat();

		var params = req.body;	
		chat.nameChat=params.nameChat;
		chat.idChat=params.idChat;
		chat.idUser=params.idUser;
		chat.idContact=params.idContact;
		chat.urlFile=params.urlFile;
		
		chat.save((err, chatStored) => {	
			console.log(err);
			if(err) return res.status(500).send({message: 'Error al guardar la el chat'});

			if(!chatStored) return res.status(404).send({message: 'No se ha podido guardar el contacto.'});

			return res.status(200).send({chat: chatStored});
		});
	},


	getChat: function(req, res){
		var chatId = req.params.id;

		if(chatId == null) return res.status(404).send({message: 'El proyecto no existe.'});

		Chat.findById(chatId, (err, chat) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!chat) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				chat
			});

		});
	},

	getChats: function(req, res){

		Chat.find({}).sort('-year').exec((err, chats) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!chats) return res.status(404).send({message: 'No hay projectos que mostrar.'});

			return res.status(200).send({chats});
		});

	},

	updateChat: function(req, res){
		var chatId = req.params.id;
		var update = req.body;

		Chat.findByIdAndUpdate(chatId, update, {new:true}, (err, chatUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!chatUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

			return res.status(200).send({
				chat: chatUpdated
			});
		});

	},

	deleteChat: function(req, res){
		var chatId = req.params.id;

		Chat.findByIdAndRemove(chatId, (err, chatRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

			if(!chatRemoved) return res.status(404).send({message: "No se puede eliminar ese proyecto."});

			return res.status(200).send({
				chat: chatRemoved
			});
		});
	},

	uploadImage: function(req, res){
		var chatId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.urlFile.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' ||fileExt == 'JPG' || fileExt == 'jpeg' || fileExt == 'gif'){

				Chat.findByIdAndUpdate(chatId, {urlFile: fileName}, {new: true}, (err, chatUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!chatUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						chat: chatUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}

	},

	getImageFile: function(req, res){
		var file = req.params.urlFile;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}

};

module.exports = controller;