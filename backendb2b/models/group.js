'use strict'

var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;


var MessageSchema =  new Schema({

    messageContent:{ type:String },
    idStatusMessage:{ type:Boolean },
    usuario :{ type:Schema.ObjectId, ref:'Usuario'},
    urlFile:{ type:String, default:'Image.png'},
},{ 	versionKey:false,
        timestamps:true, 

});

var Message = mongoose.model('Message' ,MessageSchema);


var GroupsSchema =  new Schema({
    nameChat:{ type:String },
    usuario :{ type:Schema.ObjectId, ref:'Usuario'},
    contactos :[{type:Schema.ObjectId, ref:'Contacto'}], 
    messageContent:{ type:String },
    messages:[MessageSchema] 
},{ 	versionKey:false,
        timestamps:true,      
});



//cargar grupos
GroupsSchema.plugin(mongoosePaginate);

module.exports  = mongoose.model('Group',  GroupsSchema);
