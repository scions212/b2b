'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
                idUser:{ type:Number, required:true, trim:true, unique:true },
                name: { type:String, required:true, trim:true },
                lastname: { type:String, required:true, trim:true  },
                email: { type:String, required:true, trim:true, unique:true  },
                idCard:{ type:Number, required:true, trim:true, unique:true },
                positionCompany:{type:String},
                departament:{ type:String, trim:true},
                photoPerfile:{ type:String},
        },{ 	versionKey:false,
                timestamps:true,      
})

module.exports = mongoose.model('User', userSchema);


// projects  --> guarda los documents en la coleccion