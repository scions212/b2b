'use strict'

var Bot = require('../models/bot');
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

	saveBot: function(req, res){
		var bot = new Bot();

		var params = req.body;
		bot.id_message = params.id_message;
		bot.id_employee_origin = params.id_employee_origin;
		bot.id_employee_destiny = params.id_employee_destiny;
		bot.message_content = params.message_contet;
		bot.date_message = params.date_message;
		bot.status_message_id = params.status_message_id;

		bot.save((err, botStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!botStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

			return res.status(200).send({bot: botStored});
		});
	},

	getBot: function(req, res){
		var botId = req.params.id;

		if(botId == null) return res.status(404).send({message: 'El proyecto no existe.'});

		Bot.findById(botId, (err, bot) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!bot) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				bot
			});

		});
	},

	getBots: function(req, res){

		Bot.find({}).sort('-year').exec((err, bots) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!bots) return res.status(404).send({message: 'No hay projectos que mostrar.'});

			return res.status(200).send({bots});
		});

	},

	updateBot: function(req, res){
		var botId = req.params.id;
		var update = req.body;

		Bot.findByIdAndUpdate(botId, update, {new:true}, (err, botUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!botUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

			return res.status(200).send({
				bot: botUpdated
			});
		});

	},

	deleteBot: function(req, res){
		var botId = req.params.id;

		Bot.findByIdAndRemove(botId, (err, botRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

			if(!botRemoved) return res.status(404).send({message: "No se puede eliminar ese proyecto."});

			return res.status(200).send({
				bot: botRemoved
			});
		});
	},
/*
	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						project: projectUpdated
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
		var file = req.params.image;
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
*/
};

module.exports = controller;