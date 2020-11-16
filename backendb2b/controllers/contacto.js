'use strict'

var Usuario = require('../models/usuario');
var validator =require('validator');
var Contactos = require('../models/usuario');

var controller={

   

    addContact: function (req, res) {

        var usuarioId = req.params.usuarioId;

        Usuario.findById(usuarioId).exec((err, usuario)=>{
            
            if(err){
                return  res.status(500).send({
                    status:'error',
                    message:'Error en la peticion', 
                });
            }
            if(!usuario){
                return  res.status(500).send({
                    status:'error',
                    message:'No existe el tema', 
                });
            }
            if(req.body.email){
                try{
                    var validate_email = !validator.isEmpty(req.body.email);  
                                           
                    //var validate_urlFile= ! validator.isEmpty(req.files.urlFile.path);
                }catch(err){
                        return  res.status(200).send({
                            message:'no has comentado nada', 
                    });
                }   
            
            if(validate_email){


                var contacto = {
                    usuario: req.usuario.sub,
                    email: req.body.email,
                };

                usuario.contactos.push(contacto);

                usuario.save((err)=>{

                    if(err){
                        return  res.status(500).send({
                            status:'error',
                            message:'Error al guardar el contacto', 
                        });
                    }

                return  res.status(200).send({
                    status:'status',
                    message:'Se ha añadido el contacto  ', 
                    });
                });

            }else{
                    return  res.status(200).send({
                        message:'no has comentado nada', 
                });
            }
        }
            
     }); 

},

    deleteMssg: function (req, res) {
        //Sacar el id del grupo y el comentario y del comentario a borrar
        var usuarioId = req.params.usuarioId;
        var contactoId = req.params.contactoId;

        // buscar el grupo
        Usuario.findById(usuarioId, (err,usuario)=>{

            if(err){
                return  res.status(500).send({
                    status: 'error',
                    message:'Error en la Peticion'
                });
            }
            
            if(!usuario){    
                return  res.status(404).send({  
                    status:'error', 
                    message:'no existe el grupo'
                });
            }   

        //seleccionar el subdocumento (comentario)
        var contacto = usuario.contactos.id(usuarioId);

        //borrar el comentario
        if (contacto) {
            contacto.remove();

             //guardar el grupo
            usuario.save((err)=>{
                if(err){
                    return  res.status(500).send({
                        status: 'error',
                        message:'Error en la Peticion'
                    });
                }
                //devolver el resultado
                return   res.status(200).send({
                    status:'success',
                    usuario
                });
            });              
            }else{
                return res.status(404).send({
                    status:'error',
                    message:' No existe el comentario'
                });
            }  
        });
    },

};
   
module.exports= controller; 