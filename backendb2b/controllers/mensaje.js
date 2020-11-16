'use strict'

var validator=require('validator');
var Group = require('../models/group');
var Message = require('../models/group');

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

    updateMssg :function (req, res) {

        //Conseguir ID de comentario por url
        var messagesId = req.params.messagesId;
        console.log(messagesId);
        //recoger datos y validar
        var params = req.body;
        console.log(params);
            //validar datos  
            try{
                var validate_messageContent = !validator.isEmpty(params.validate_messageContent);  
            }catch(err){ 
                    return  res.status(200).send({
                        message:'no has comentado nada', 
                });
            }
            if(validate_messageContent) {
                // find and update del subdocumento del comentario 
                Group.findByIdAndUpdate(
                    {" messages._id": messagesId },
                    {
                        "$set": {
                            "messages.$.messageContent":params.messageContent
                        }
                    }, 
                    {new:true}, 
                    (err,groupUpdated)=>{
                       
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

    putGroup:function (req,res) {

        //recoger el id de la conversacion de la url
        var messagesId = req.params.messagesId;
        console.log(messagesId);
        //recoger datos y validar
        var params = req.body;
        console.log(params);
        //validar datos
        try{
            var validate_messageContent = !validator.isEmpty(params.messageContent);
            
        }catch(err){
                return  res.status(200).send({
                    message:'faltan datos por enviar // PUT', 
            });
        }

        if(validate_messageContent) {
            //montar un json con los datos modificables
            var update={
                messageContent: params.messageContent,
               
            };

        //find and update del topic por id y por id de usuario
            Group.findOneAndUpdate({ _id: messagesId, usuario : req.usuario.sub}, update, {new:true}, (err,groupUpdated)=>{
                console.log(groupUpdated); 
                if (err) {
                 return res.status(500).send({
                      status:'error',
                      message:'error en la peticion  grupo',
                    });   
                }

                if (!groupUpdated) {
                    return res.status(404).send({
                        status:'error',
                        message:'Error no se ha actualizado el grupo  ',
                      }); 
                }


               
        //devolver respuesta 
            return res.status(200).send({
                status:'success',
                group:groupUpdated
                }); 
            });
       
        }else{
            return res.status(200).send({
                status:'error',
                message:'la validacion de los datos no es correcta ',
            }); 

        }
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

    //REVISAR!
    searchMssg: function(req,res){

        //Sacar string a buscar de la url
        var searchString = req.params.search;
        //find or 
        Message.find({ "$or":[
            { "messageContent":{"$regex":searchString, "$options": "i"}},
        ]})
        .sort([['createdAt', 'descending']])
        .exec((err, message) =>{

            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error en la peticion'
                });
            }
            if(!message){
                return res.status(404).send({
                    status:'error',
                    message:'Datos no encontrados'
                }); 
             }
      
            //devolver el resultado
            return res.status(200).send({
                status:'success',
                message
            });
        }); 
    },  
    
    uploadUrlFile: function(req,res){
        //configurar el modulo mutiparty (subida de fichero)

        //recoger el fichero de la peticion
        var urlFile = 'Imagen no se ha podido subir...';
        
    
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
            var messageId = req.params.messageId;

            //recoger datos y validar
            var params = req.params.messageId;
                //validar datos
                
            console.log(params);
                    // find and update del subdocumento del comentario
                    Group.findByIdAndUpdate(
                        {" message._id": messageId },
                        {
                            "$set": {
                                "message.$.urFile":params.urFile
                            }
                        },
                        {new:true}, 
                        (err,groupUpdated)=>{
                           
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
                            console.log(path);
                           //devolver los datos
                           return  res.status(200).send({
                                status:"success",
                                group:groupUpdated
                                });   
                           });
                   
                 }
},

uploadUrlFile2: function(req,res){
    //configurar el modulo mutiparty (subida de fichero)

    //recoger el fichero de la peticion
    var urlFile = 'Imagen no se ha podido subir...';

    if(!req.files){

        return res.status(404).send({
            status:'error',
            message: urlFile
            
        });
    }
   // conseguir el nombre y la extension del archivo
   var file_path= req.files.urlFile.path;
   var file_split = file_path.split('\\');
   console.log(file_path);

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
        //sacar el id del message 
             var messageId= messageId;
        //buscar y actualizar documentos de la bd
        Message.findOneAndUpdate({ _id: messageId}, {urlFile:file_name}, {new:true}, (err, messageUpdated)=>{
             
         if(err || !messageUpdated){
 
             //devolver respuesta 
             return res.status(500).send({
                 status:'error',
                 message:'Error al guardar el mensaje',
                     });
                 }
             return res.status(200).send({
                 status:'succes',
                 message : messageUpdated
                 });
                 
             });
       
         }
     },
 
    


    urlFile :function(req,res){
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