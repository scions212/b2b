'use strict'

var Msg = require('../models/message');

var fs = require('fs');
var path = require('path');

var controller = {

	home: function (req, res) {
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	test: function (req, res) {
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador de bot"
		});
	},

	saveMsg: function (req, res) {
		var msg = new Msg();

		var params = req.body;
		msg.idChat=params.idChat;  
		msg.messageContent = params.messageContent;
		msg.idStatusMessage = params.idStatusMessage;
		msg.idUser = params.idUser;
		msg.urlFile = null;

		msg.save((err, msgStored) => {
			console.log(err)
			if (err) return res.status(500).send({
				message: 'Error al guardar el documento.'
			});

			if (!msgStored) return res.status(404).send({
				message: 'No se ha podido guardar el proyecto.'
			});

			return res.status(200).send({
				msg: msgStored
			});
		});
	},
	getMsg: function (req, res) {
		var msgId = req.params.id;

		if (msgId == null) return res.status(404).send({
			message: 'El proyecto no existe.'
		});

		Msg.findById(msgId, (err, msg) => {

			if (err) return res.status(500).send({
				message: 'Error al devolver los datos.'
			});

			if (!msg) return res.status(404).send({
				message: 'El proyecto no existe.'
			});

			return res.status(200).send({
				msg
			});

		});
	},

	getMsgs: function (req, res) {

		Msg.find({}).sort('-year').exec((err, msgs) => {

			if (err) return res.status(500).send({
				message: 'Error al devolver los datos.'
			});

			if (!msgs) return res.status(404).send({
				message: 'No hay projectos que mostrar.'
			});

			return res.status(200).send({
				msgs
			});
		});

	},

	updateMsg: function (req, res) {
		var msgId = req.params.id;
		var update = req.body;

		Msg.findByIdAndUpdate(msgId, update, {
			new: true
		}, (err, msgUpdated) => {
			if (err) return res.status(500).send({
				message: 'Error al actualizar'
			});

			if (!msgUpdated) return res.status(404).send({
				message: 'No existe el proyecto para actualizar'
			});

			return res.status(200).send({
				msg: msgUpdated
			});
		});

	},

	deleteMsg: function (req, res) {
		var userId = req.params.id;

		Msg.findByIdAndRemove(userId, (err, msgRemoved) => {
			if (err) return res.status(500).send({
				message: 'No se ha podido borrar el proyecto'
			});

			if (!msgRemoved) return res.status(404).send({
				message: "No se puede eliminar ese proyecto."
			});

			return res.status(200).send({
				msg: msgRemoved
			});
		});
	},

	uploadImage: function (req, res) {
		var msgId = req.params.id;
		var fileName = 'Imagen no subida...';

		if (req.files) {
			var filePath = req.files.urlFile.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if (fileExt == 'png' || fileExt == 'JPG' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

				Msg.findByIdAndUpdate(msgId, {
					urlFile: fileName
				}, {
					new: true
				}, (err, msgUpdated) => {
					if (err) return res.status(500).send({
						message: 'La imagen no se ha subido'
					});

					if (!msgUpdated) return res.status(404).send({
						message: 'El proyecto no existe y no se ha asignado la imagen'
					});

					return res.status(200).send({
						msg: msgUpdated
					});
				});

			} else {
				fs.unlink(filePath, (err) => {
					return res.status(200).send({
						message: 'La extensión no es válida'
					});
				});
			}

		} else {
			return res.status(200).send({
				message: fileName
			});
		}
	},

	getImageFile: function (req, res) {
		var file = req.params.urlFile;
		var path_file = './uploads/' + file;

		fs.exists(path_file, (exists) => {
			if (exists) {
				return res.sendFile(path.resolve(path_file));
			} else {
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}
};

module.exports = controller;