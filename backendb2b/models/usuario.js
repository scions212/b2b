'use strict'

var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var ContactoSchema = new Schema({
      usuario :{ type:Schema.ObjectId, ref:'Usuario'},
      email: { type:String, unique:true, trim:true, require:true}
      },{ 	versionKey:false,
            timestamps:true,      
});

var Contacto = mongoose.model('Contacto', ContactoSchema);

var UsuarioSchema = new Schema({
      name: { type:String,  trim:true, require:true},
      lastname: { type:String,  trim:true,  require:true},
      email: { type:String, unique:true, trim:true, require:true},
      password: { type:String, trim:true, required: [true,'El Password debe ser mas de 6 caracteres']},
      nPhone: { type:String, trim:true, required: [true,'El Numero debe insertar el umero de telefono']},
      photoProfile:{ type:String, default:'Image.png'},
      contactos:[ContactoSchema] 
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

