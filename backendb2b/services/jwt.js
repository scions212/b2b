'use strict'


var jwt = require ('jwt-simple');   
var moment =require('moment');

exports.createToken = function (usuario) {
    var payload={
        sub: usuario._id,
        name: usuario.name,
        lastname: usuario.lastname ,
        email: usuario.email ,
        image: usuario.image,
        nph:usuario.nph,
        iat: moment().unix(),
        exp: moment().add(90,'days').unix
    };
    //enviar clave secreta del token
    return jwt.encode(payload,'la-clave-secreta-del-token-123456');
};