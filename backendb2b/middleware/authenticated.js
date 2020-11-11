'use strict'


var moment=require('moment');
var jwt=require('jwt-simple');
var secret=('la-clave-secreta-del-token-123456');

exports.authenticated = function (req, res, next) {
    
    //comprobar si llega la autorizacion
    if(!req.headers.authorization){
        return  res.status(403).send({
           message:'La peticion no tiene la cabecera de authorization' 
        });
    }
    //limpiar el token y quitar comillas 
    var token = req.headers.authorization.replace(/['"]+/g, '');

    //decodificar el token
    try{
        var payload= jwt.decode(token, secret);
    //comprobar si el token a expirado
        if(payload.exp <= moment().unix()){
            return  res.status(404).send({
                message:'el token ha Expirado' 
             });
        }

    }catch(ex) {
        return  res.status(404).send({
            message:'el token no es Valido' 
         });
    
    }
    //adjuntar usuario identificado a request
    req.usuario = payload;
    //pasar a la accion 
    console.log('estas pasando por el middleware');

    next();
};