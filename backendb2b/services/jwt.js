'use strict'


var jwt = require ('jwt-simple');   
var moment =require('moment');

exports.createToken = function (user) {
    var payload={
        sub: user._id,
        name: user.name,
        lastname: user.lastname ,
        email: user.email ,
        image: user.image,
        nph:user.nph,
        iat: moment().unix(),
        exp: moment().add(90,'days').unix
    };
    //enviar clave secreta del token
    return jwt.encode(payload,'la-clave-secreta-del-token-123456');
};