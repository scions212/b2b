'use strict'

var validator=require('validator');
var Group = require('../models/group');

var controller = {
//rutas o controladores de pruebas

    test: function(req,res){
        return res.status(200).send({
            message:"soy el metodo testeando"
        });

    },

    saveGroup : function (req, res) {

        //recoger parametros por post
        var params= req.body;

        //validar datos
        try{
            var validate_nameChat = !validator.isEmpty(params.nameChat);
           // var validate_prueba = !validator.isEmpty(params.prueba);          
        }catch(err){
                return  res.status(404).send({
                    message:'faltan datos por enviar // Save', 
            });
        }
        
        if(validate_nameChat /*&& validate_prueba*/){

        //crear objeto a guardar 
            var group = new Group();
        //asignar valores
            group.nameChat = params.nameChat;
            group.usuario = req.usuario.sub;
            group.contact = params.contact;
            group.urlFile=null;

        //guardar topic
            group.save((err, groupStored) =>{
        //devolver una respuesta 
                if (err || !groupStored) {
                    return  res.status(404).send({
                        status:'error',
                        message:'el Tema no se ha guardado'
                    });
                }
                return res.status(200).send({
                    status:'succes',
                    groupStored
                });

            });
      
        }else{
            return res.status(404).send({
                message:'Los datos no son Validos'
            });
        }
    },

    getGroups: function(req,res){

        //recoger grupos actuales
        if (!req.params.group || req.params.group == null || req.params.group == undefined) {
            
        }else{
                //cargar los mensajes
                var group = req.params.group;
        }
       
        //indicar las opciones  de la paginacion
        var options ={
            sort:{ createdAt: -1},
            populate:'usuario'
        };
        //find message

      
    Group.paginate({} , options,(err,group)=>{

        if(err){
            return res.status(500).send({
                status:'error',
                message:'error al hacer la consulta',   
            });
        }
        if(!group){
            return res.status(404).send({
                status:'notFound',
                message:'no hay datos'
            });
        }

        return res.status(200).send({
            status:'success',
            group:group.docs,
            totalDocs:group.totalDocs,
            });
        });
    },  

    getGroupByUsuario: function(req,res){

        //conseguir el id del usuario

        var usuario = req.params.usuario;
        Group.find({
            usuario:usuario
        })
        .sort([['createdAt', 'descending']])
        .exec((err,group)=> {
            if (err) {
                return res.status(500).send({
                    status:'error',
                    message:'error en la peticion '
              });
            }
            if(!group){
                return res.status(404).send({
                    message:'no hay grupos para mostrar'
              });
            }
        
        //devolver resultado
        return res.status(200).send({
            status:'success',
            group
        });
     });
     
    },

    getGroup: function (req,res) {
        //sacar eñ id del topic de la url
        var groupId = req.params.id;

        //find por id del topic
        Group.findById(groupId)
                .populate('usuario')
                .exec((err,group)=> {

            if (err) {
                return res.status(500).send({
                    status:'error',
                    message:'Error en la peticion',
                });  
            }

            if (!group) {
                return res.status(404).send({
                    status:'error',
                    message:'No existe el grupo',
                });  
            }
        //Devolver Resultado
        return res.status(200).send({
            status:'success',
            group
            });
        });   
    },

    putGroup:function (req,res) {

        //recoger el id de la conversacion de la url
        var groupId = req.params.id;
        // recoger los datos que llega desde el post
        var params = req.body;
        //validar datos
        try{
            var validate_nameChat = !validator.isEmpty(params.nameChat);
           
        }catch(err){
                return  res.status(200).send({
                    message:'faltan datos por enviar // PUT', 
            });
        }

        if(validate_nameChat) {
            //montar un json con los datos modificables
            var update={
                nameChat: params.nameChat
            };

        //find and update del topic por id y por id de usuario
            Group.findOneAndUpdate({ _id: groupId, usuario : req.usuario.sub}, update, {new:true}, (err,groupUpdated)=>{
                
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

    deletetGroup: function(req,res){

        //sacar el id del grupo de la url
        var groupId = req.params.id;
        //find and delete por groupID y por usuarioID
        Group.findByIdAndDelete({_id: groupId, usuario: req.usuario.sub}, (err,groupRemoved)=>{

            if (err) {
                return res.stats(500).send({
                    status:'error',
                    message:'Error en la peticion'
                });
            }

            if(!groupRemoved){
                return res.stats(404).send({
                    status:'error',
                    message:'No se ha borrado el el grupo'
                });
            }
            //Devolver respuesta
            return res.status(200).send({
                status:'success',
                message:'Se ha borrado el grupo con exito!',
                group:groupRemoved
            }); 
        }); 
    },
    searchGroup: function(req,res){

        //Sacar string a buscar de la url
        var searchString = req.params.search;
        //find or 
        Group.find({ "$or":[
            { "nameChat": { "$regex": searchString, "$options": "i"}},
            { "message":{"$regex":searchString, "$options": "i"}},
            { "messageContent":{"$regex":searchString, "$options": "i"}}
        ]})
        .sort([['createdAt', 'descending']])
        .exec((err, groups) =>{

            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error en la peticion'
                });
            }
            if(!groups){
                return res.status(404).send({
                    status:'error',
                    message:'Datos no encontrados'
                }); 
             }
      
            //devolver el resultado
            return res.status(200).send({
                status:'success',
                groups
            });
        }); 
    }

};

module.exports=controller;