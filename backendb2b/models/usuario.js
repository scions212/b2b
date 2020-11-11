'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
                name: { type:String,  trim:true, require:true},
                lastname: { type:String,  trim:true,  require:true},
                email: { type:String, unique:true, trim:true, require:true},
                password: { type:String, trim:true, required: [true,'El Password debe ser mas de 6 caracteres']},
                nPhone: { type:String, trim:true, required: [true,'El Numero debe insertar el umero de telefono']},
                photoProfile:{ type:String, default:'Image.png'},
        },{ 	versionKey:false,
                timestamps:true,      
});


//metodo para Eliminar password
UsuarioSchema.methods.toJSON=function () {
      var obj =this.toObject();
      delete obj.password;
      
      return obj;
};

module.exports = mongoose.model('Usuario', UsuarioSchema);

