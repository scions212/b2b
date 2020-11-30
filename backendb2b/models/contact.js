'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContactSchema =  new Schema({

    usuario :{ type:Schema.ObjectId, ref:'Usuario'},
    nph:{ type:Number, trim:true, require:true},
},{ 	versionKey:false,
        timestamps:true,      
});


module.exports = mongoose.model('Contact', ContactSchema);
// projects  --> guarda los documents en la coleccion