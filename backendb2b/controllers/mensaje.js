'use strict'
const mongoose = require('mongoose');
var validator=require('validator');
var Group = require('../models/group');
var Message = require('../models/group');
var fs =require('fs');
var path=require('path');

var controller={

    
    addMssg: function (req, res) {

        //recoger el id del topic de la URL
        var groupId = req.params.groupId;

        //find por id del topic
            Group.findById(groupId).exec((err,group)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message:'Error en la Peticion'
                    });
                }
                
                if(!group){    
                    return  res.status(404).send({
                        status:'error', 
                        message:'no existe el grupo'
                    });
                }

                //comprar que el ojeto del usuario y validar los datos
                if (req.body.messageContent) {
                                //validar datos
                    try{
                        var validate_messageContent = !validator.isEmpty(req.body.messageContent);  
                        var validate_idStatusMessage = !validator.isEmpty(req.body.idStatusMessage);  
                        
                        //var validate_urlFile= ! validator.isEmpty(req.files.urlFile.path);
                    }catch(err){
                            return  res.status(200).send({
                                message:'no has comentado nada', 
                        });
                    }
                    
                if (validate_messageContent && validate_idStatusMessage /*&& validate_urlFile*/) {

                    var message={
                        usuario : req.usuario.sub,
                        messageContent: req.body.messageContent,
                        idStatusMessage: req.body.idStatusMessage,
                       // urlFile :req.files.urlFile.path,
                        
                    };
                //en la propiedad coments del objeto resultante hacer un push
                group.messages.push(message);

                //guardar el topic completo
                group.save((err,)=>{
                    if(err){
                        return  res.status(500).send({ 
                            status: 'error',
                            message:'Error a guardar el mensaje'
                        });
                    }

                //devolver respuessta
                return res.status(200).send({
                    status:'success',
                    group
                });
                    });

                    }else{
                            return  res.status(200).send({
                                message:'no se han validado los datos del comentario ', 
                        });
                    } 
                }
      
        });
    },
    
    deleteMssg: function (req, res) {
        //Sacar el id del grupo y el comentario y del comentario a borrar
        var groupId = req.params.groupId;
        var messageId = req.params.messageId;

        // buscar el grupo
        Group.findById(groupId, (err,group)=>{

            if(err){
                return  res.status(500).send({
                    status: 'error',
                    message:'Error en la Peticion'
                });
            }
            
            if(!group){    
                return  res.status(404).send({  
                    status:'error', 
                    message:'no existe el grupo'
                });
            }   

        //seleccionar el subdocumento (comentario)
        var message = group.messages.id(messageId);

        //borrar el comentario
        if (message) {
            message.remove();

             //guardar el grupo
            group.save((err)=>{
                if(err){
                    return  res.status(500).send({
                        status: 'error',
                        message:'Error en la Peticion'
                    });
                }
                //devolver el resultado
                return   res.status(200).send({
                    status:'success',
                    group
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


    updateMssg:function (req, res) {

        //Conseguir ID de comentario por url
        var messagesId = req.params.messagesId;
     
        //recoger datos y validar
        var params = req.body;
       
        
            //validar datos  
            try{
                var validate_messageContent = !validator.isEmpty(params.messageContent);  
            }catch(err){ 
                    return  res.status(200).send({
                        message:'no has comentado nada', 
                });
            }
            if(validate_messageContent) {
                // find and update del subdocumento del comentario 
                Group.findOneAndUpdate(
                    { "messages._id": messagesId },
                    {
                        "$set": {
                            "messages.$.messageContent":params.messageContent
                        }
                    }, 
                    {new:true},
                    (err,groupUpdated)=>{
                    console.log(err,groupUpdated);
    
                        if(err){
                            return   res.status(500).send({
                                status: 'error',
                                message:'Error en la Peticion'
                            });
                        }
                        
                        if(!groupUpdated){    
                            return   res.status(404).send({
                                status:'error', 
                                message:'no existe el grupo'
                            });
                        }   
                       //devolver los datos
                       return  res.status(200).send({
                            status:"success",
                            group:groupUpdated
                            });   
                       }); 
             }
    },
    

    uploadUrlFile:function (req, res) {  
       
       
        //recoger el fichero de la peticion
        var urlFile = 'Avatar no subido...';
    
        if(!req.files){

            return res.status(404).send({
                status:'error',
                message: urlFile
            });
        }
       // conseguir el nombre y la extension del archivo
       var file_path= req.files.urlFile.path;
       var file_split = file_path.split('\\');
    
        //nombre del archivo
       var file_name= file_split[2];
       
       //Extension del archivo
       var ext_split = file_name.split('\.');
       var file_ext = ext_split[1];

       //comprobar extension(solo imagenes)
        if (file_ext != 'png' && file_ext !='jpg' && file_ext !='jpeg' && 
        file_ext !='gif'&& file_ext !='JPG'){
            fs.unlink(file_path, () =>{
                
                return res.status(200).send({
                    status:'error',
                    message:'La Extension del Archivo no es valido',
                    file: file_ext
                    });
            });
        }else{
         
        //Conseguir ID del mensaje por url
        var messagesId = req.params.messagesId;

         //recoger datos y validar
         var params = req.body;

        //recoger datos y validar
         // var params = req.files;

                // find and update del subdocumento del comentario 
                Group.findOneAndUpdate(
                    { "messages._id": messagesId },
                    {
                        "$set": {
                            "messages.$.urlFile":params.urlFile
                        }
                    }, 
                    {new:true},
                    (err,groupUpdated)=>{
                    
                        console.log(messagesId,params.urlFile);
                        
                        if(err){
                            return   res.status(500).send({
                                status: 'error',
                                message:'Error en la Peticion'
                            });
                        }
                        
                        if(!groupUpdated){    
                            return   res.status(404).send({
                                status:'error', 
                                message:'no existe el grupo'
                            });
                        }   
                       //devolver los datos
                       return  res.status(200).send({
                            status:"success",
                            group:groupUpdated
                            });   
                       }); 
            
        }

    },


    urlFile :function( req , res){
        var file_name = req.params.file_name;
        var path_file = './uploads/users/'+'fileName';

        fs.exists(path_file , (exists)=>{

            if (exists) {
                //envia el archivo resolviendo el path completo de donde esta ubicada el archivo
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    message:'la image no existe'
                });
            }
        });
        
    },
    
};

module.exports= controller; 