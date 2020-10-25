'use strict'

var User = require('../models/users');

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

	saveUser: function(req, res){
		var user = new User();

		var params = req.body;	
        user.idUser=params.idUser;
        user.name=params.name;
		user.lastame=params.lastame;
		user.idCard=params.idCard;
		user.positionCompany=params.positionCompany;
        user.idDepartament=params.idDepartament;
        user.photoPerfil= null;

    user.save((err, userStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!userStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

			return res.status(200).send({user: userStored});
		});
	},
	getUser: function(req, res){
		var userId = req.params.id;

		if(userId == null) return res.status(404).send({message: 'El proyecto no existe.'});

		User.findById(userId, (err, user) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!user) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				user
			});

		});
	},

	getUsers: function(req, res){

		User.find({}).sort('-year').exec((err, users) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!users) return res.status(404).send({message: 'No hay projectos que mostrar.'});

			return res.status(200).send({users});
		});

	},

	updateUser: function(req, res){
		var userId = req.params.id;
		var update = req.body;

		User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!userUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

			return res.status(200).send({
				user: userUpdated
			});
		});

	},

	deleteUser: function(req, res){
		var userId = req.params.id;

		User.findByIdAndRemove(userId, (err, userRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

			if(!userRemoved) return res.status(404).send({message: "No se puede eliminar ese proyecto."});

			return res.status(200).send({
				user: userRemoved
			});
		});
	},	
	
	
	uploadImage: function(req, res){
		var userId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.photoPerfil.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'JPG' ||fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				User.findByIdAndUpdate(userId, {photoPerfil: fileName}, {new: true}, (err, userUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!userUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						user: userUpdated
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
		var file = req.params.photoPerfil;
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




