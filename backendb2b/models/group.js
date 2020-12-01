'use strict'

var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;


var MessageSchema =  new Schema({

    messageContent:{ type:String },
    idStatusMessage:{ type:Boolean },
    user :{ type:Schema.ObjectId, ref:'User'},
    urlFile:{ type:String, default:'Image.png'},
},{ 	versionKey:false,
        timestamps:true, 

});

var Message = mongoose.model('Message' ,MessageSchema);


var GroupsSchema =  new Schema({
    nameChat:{ type:String },
    user :{ type:Schema.ObjectId, ref:'User'},
    contact :{type:Schema.ObjectId, ref:'Contact'}, 
    messageContent:{ type:String },
    messages:[MessageSchema] 
},{ 	versionKey:false,
        timestamps:true,      
});



//cargar grupos
GroupsSchema.plugin(mongoosePaginate);

module.exports  = mongoose.model('Group',  GroupsSchema);
