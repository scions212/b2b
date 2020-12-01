'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContactSchema =  new Schema({

      user :{ type:Schema.ObjectId, ref:'User'},
      email: { type:String, unique:true, trim:true, require:true}
      },{ 	versionKey:false,
            timestamps:true,      
});


module.exports = mongoose.model('Contact', ContactSchema);
// projects  --> guarda los documents en la coleccion
