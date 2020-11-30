'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
                name: { type:String,  trim:true, require:true},
                lastname: { type:String,  trim:true,  require:true},
                email: { type:String, unique:true, trim:true, require:true},
                password: { type:String, trim:true, required: [true,'El Password debe ser mas de 6 caracteres']},
                photoProfile:{ type:String, default:'Image.png'},
        },{ 	versionKey:false,
                timestamps:true,      
});




module.exports = mongoose.model('User', userSchema);


// projects  --> guarda los documents en la coleccion