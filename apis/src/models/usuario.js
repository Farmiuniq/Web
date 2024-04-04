const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const UserSchema = mongoose.Schema({

    t_doc:{
        type:ObjectId,
        ref: 'tipoDocumento',
        required:true,
    },

    id_usuario:{
        type: String,
        required:true,
    },
    
    nombre: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
   
    
});

module.exports = mongoose.model('usuario', UserSchema);
