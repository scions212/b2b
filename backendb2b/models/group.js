'use strict'

var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Contact = require('../models/contact');
var Schema = mongoose.Schema;


var MessageSchema =  new Schema({

    messageContent:{ type:String },
    idstatusMessage:{ type:Boolean },
    idUser:{ type:Schema.ObjectId, ref:'Usuario'},
    urlFile:{ type:String, default:'Image.png'},
    photoProfile:{ type:String, default:'Image.png'},
},{ 	versionKey:false,
        timestamps:true, 

});

var Message = mongoose.model('Message' ,MessageSchema);


var GroupsSchema =  new Schema({
    nameChat:{ type:String },
    usuario :{ type:Schema.ObjectId, ref:'Usuario'},
    contact :[{type:Schema.ObjectId, ref:'Contact'}], 
    messageContent:{ type:String },
    messages:[MessageSchema] 
},{ 	versionKey:false,
        timestamps:true,      
});



//cargar grupos
GroupsSchema.plugin(mongoosePaginate);

module.exports  = mongoose.model('Group',  GroupsSchema);
