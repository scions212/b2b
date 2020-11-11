'use strict'

var Contact = require('../models/contact');
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
			message: "Soy el metodo o accion test del controlador de Contact User"
		});
	},

	saveContact: function(req, res){
		var contact = new Contact();

		var params = req.body;
		contact.idUser=params.idUser;
		contact.nph=params.nph;
	

		contact.save((err, contactStored) => {
			console.log(err)
			if(err) return res.status(500).send({message: 'Error al guardar la info.'});

			if(!contactStored) return res.status(404).send({message: 'No se ha podido guardar el contacto.'});

			return res.status(200).send({contact: contactStored});
		});
	},

	getContact: function(req, res){
		var contactId = req.params.id;

		if(contactId == null) return res.status(404).send({message: 'El proyecto no existe.'});

		Contact.findById(contactId, (err, contact) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!contact) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				contact
			});

		});
	},

	getContacts: function(req, res){

		Contact.find({}).sort('-year').exec((err, contact) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!contact) return res.status(404).send({message: 'No hay projectos que mostrar.'});

			return res.status(200).send({contact});
		});

	},

	updateContac: function(req, res){
		var contactId = req.params.id;
		var update = req.body;

		Contact.findByIdAndUpdate(contactId, update, {new:true}, (err, contactUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!contactUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

			return res.status(200).send({
				contact: contactUpdated
			});
		});

	},

	deleteContact: function(req, res){
		var contactId = req.params.id;

		Contact.findByIdAndRemove(contactId, (err, contactRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

			if(!contactRemoved) return res.status(404).send({message: "No se puede eliminar ese proyecto."});

			return res.status(200).send({
				contact: contactRemoved
			});
		});
	},

	uploadImage: function(req, res){
		var contactId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.photoProfile.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Contact.findByIdAndUpdate(contactId, {photoProfile: fileName}, {new: true}, (err, contactUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!contactUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						contact: contactUpdated
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
		var file = req.params.photoProfile;
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