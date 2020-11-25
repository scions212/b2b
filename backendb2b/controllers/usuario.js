'use strict'

var Usuario = require('../models/usuario');
var validator =require('validator');
var bcrypt = require('bcrypt');
var fs =require('fs');
var path=require('path');
const saltRounds = 10;
var jwt = require('../services/jwt');
const { exists } = require('../models/usuario');

var controller = {
//rutas o controladores de pruebas
    home: function(req, res){
        return res.status(200).send({
            message:"soy el metodo probando"
        });
    },

    test: function(req,res){
        return res.status(200).send({
            message:"soy el metodo testeando"
        });

    },

//METODO SAVE (POST)
    save: function (req,res) {

//recoge los parametros de la peticion
        var params = req.body;

//valida los datos
    try{
       
        var validate_name = !validator.isEmpty(params.name);
        var validate_lastname = !validator.isEmpty(params.lastname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);   
        var validate_nPhone =  !validator.isEmpty(params.nPhone);
        var validate_password = !validator.isEmpty(params.password);

    }catch(err){
            return  res.status(404).send({
                message:'faltan datos por enviar // Save', 
        });
    }

//console.log(validate_name, validate_lastname,  validate_email,validate_password, validate_photoPerfile);
        if (validate_name && validate_lastname &&  validate_email && validate_nPhone && validate_password ){


//Crea Objeto Usuario
            var usuario = new Usuario();
	
            usuario.name = params.name;
            usuario.lastname = params.lastname;
            usuario.email = params.email.toLowerCase();
            usuario.password = bcrypt.hashSync(params.password,10);
            usuario.nPhone= params.nPhone;
            usuario.photoPerfile = null;

//Comprobar que el usuario existe
                Usuario.findOne({ email:usuario.email}, (err, issetUsuario)=>{
                    if (err){
                         return res.status(500).send({
                        message: 'Error al comprobar el duplicidad el usuario. // Save '
                    });
                }

                if (!issetUsuario) {
//Si no existe     
//cifra la contraseña
                    bcrypt.hash(params.password, saltRounds, function(err, hash) {
                        usuario.password=hash;
                       //Guarda el Usuario
                       usuario.save((err, usuarioStored)=>{
                           console.log(err, usuarioStored);
                        if (err){
                            return res.status(500).send({
                                message: 'Error al guardar el usuario. // Save'
                                });
                            }
                        if(!usuarioStored){
                            return res.status(400).send({
                                message: 'El usuario no se ha guardado.// Save'
                                });

                            }
                             //Devolver Respuestas  
                        return res.status(200).send({
                            status : 'success // Save',
                            usuario: usuarioStored
                            });
                       });//close save
                                      
                    });//close bycript

                }else{
                    return res.status(200).send({
                        message:'El usuario ya existe en la BD // Save'
                        });
                    }
                });
        }else{
            return res.status(200).send({
            message:'la validacion de los datos del usuario es incorrecta, intentalo de nuevo// Save'
            });
        }
    },


    login: function(req, res) {
        var params =req.body;
        
        //validar los datos
        try{
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        }catch(err){
                return  res.status(404).send({
                    message:'faltan datos por enviar //login', 
            });
        }

        if (!validate_email && !validate_password ){
            return res.status(200).send({
                message:'Datos Incorrectos //login'
                });            
        }    
        //buscar usuarios que coinciden el email
        Usuario.findOne({ email: params.email.toLowerCase()}, (err, usuario) =>{
           
           if(err){ return res.status(500).send({
                message:'error al intentar identificarse //login',
            });    
        }
        if(!usuario){ 
            return res.status(400).send({
                message:'el usuario no existe //login',
            });    
        }

        //si lo encuentra,

        //comprobar la contraseña (coincidencia de email y password / bycript)

        bcrypt.compare(params.password, usuario.password,(err, check)=>{
        //si es correcto
            if(check){
         //generar token de jwt y devolverlo (mas tarde)
                if(params.gettoken){
        //devolver los datos
                return res.status(200).send({
                 token:jwt.createToken(usuario)
                });
            }else{
                //limpiar el objeto
                usuario.password=undefined;
                           
                //devolver los datos
                    return res.status(200).send({
                        status:'Success //login',
                        usuario
                    });
                }
            
            }else{
                    return res.status(200).send({
                        status:'las Credenciales no son correctas //login',
                    });
                }  
            });          
        });
    },
    //crear middleware para comprobar el jwt
    update : function (req,res) {
        //recoger datos del usuario
        var params= req.body;
        
        //validar datos 
    try{
        var validate_name =!validator.isEmpty(params.name);
        var validate_lastname =!validator.isEmpty(params.lastname);
        var validate_email =!validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_nPhone =!validator.isEmpty(params.nPhone);
    }catch(err){
        return res.status(200).send({
            message: 'faltan datos por enviar'
        });
    }
        //eliminar propiedades innecesarias
        delete params.password;

        var usuarioId= req.usuario.sub;
        console.log(req.usuario.email);
 
        if (req.usuario.email != params.email) {
            Usuario.findOne({ email: params.email.toLowerCase()}, (err, usuario) =>{
           
                if(err){ return res.status(500).send({
                     message:'error al intentar identificarse //login',
                 });    
             }
                if(usuario && usuario.email == params.email ){ 
                 return res.status(200).send({
                     message:'el Email no puede ser modificado //login',
                 });    
             }else{
                    //Buscar y actualizar documento
            Usuario.findOneAndUpdate({ _id: usuarioId}, params, {new:true}, (err, usuarioUpdated)=>{
                    if (err) {
                        return res.status(500).send({
                            status:'error',
                            message:'Error al Actualizar usuario'
                        });
                    }

                    if(!usuarioUpdated) {
                        return res.status(200).send({
                            status:'error',
                            message:'no se a Actualizado el usuario'
                        });
                    }
                    //devolver respuesta
                    return res.status(200).send({
                        status:'success',
                        usuario: usuarioUpdated
                    });
                });
             }
        });
    }else{
            //Buscar y actualizar documento
        Usuario.findOneAndUpdate({ _id: usuarioId}, params, {new:true}, (err, usuarioUpdated)=>{
                if (err) {
                    return res.status(500).send({
                        status:'error',
                        message:'Error al Actualizar usuario'
                    });
                }

                if(!usuarioUpdated) {
                    return res.status(200).send({
                        status:'error',
                        message:'no se a Actualizado el usuario'
                    });
                }
                //devolver respuesta
                return res.status(200).send({
                    status:'success',
                    usuario: usuarioUpdated
                });
            });
        }
    },

    getUsuarios: function (req,res){
        Usuario.find().exec((err , usuarios)=>{
            if(err || !usuarios){
                return res.status(404).send({
                    status:'error',
                    message:'no existen usuarios en la BD'
                });
            }
                return res.status(200).send({
                    status:'success',
                    usuarios
            });           
        });
    },

    getUsuario: function (req,res){
        var usuarioId= req.params.usuarioId;
        Usuario.findById(usuarioId).exec((err, usuario)=>{
            if(err || !usuario){
                return res.status(404).send({
                    status:'error',
                    message:'no existen usuario en la BD'
                });
            }
                return res.status(200).send({
                    status:'success',
                    usuario
            });
        });
    },

    deleteUsusario: function(req, res){
        var usuarioId= req.params.usuarioId;

		Usuario.findByIdAndRemove(usuarioId, (err, usuarioRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha encontrado el usuario'});

			if(!usuarioRemoved) return res.status(404).send({message: "No se puede eliminar el usuario"});

			return res.status(200).send({
				usuario: usuarioRemoved
			});
		});
    },	
    
    uploadPhotoProfile: function(req,res){
        //configurar el modulo mutiparty (subida de fichero)

        //recoger el fichero de la peticion
        var photoProfile = 'Avatar no subido...';
        

        if(!req.files){

            return res.status(404).send({
                status:'error',
                message: photoProfile
                
            });
        }
       // conseguir el nombre y la extension del archivo
       var file_path= req.files.photoProfile.path;
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
       //sacar el id del usuario identificado
            var usuarioId= req.usuario.sub;
       //buscar y actualizar documentos de la bd
       Usuario.findOneAndUpdate({ _id: usuarioId}, {photoProfile:file_name}, {new:true}, (err, usuarioUpdated)=>{
            
        if(err || !usuarioUpdated){

            //devolver respuesta 
            return res.status(500).send({
                status:'error',
                message:'Error al guardar el usuario',
                    });
                }
            return res.status(200).send({
                status:'succes',
                usuario : usuarioUpdated
                });
                
            });
      
        }
    },


    photoProfile :function(req,res){
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
        
    }
};

module.exports= controller;