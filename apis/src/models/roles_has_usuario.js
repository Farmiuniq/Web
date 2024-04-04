const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const userrolSchema = mongoose.Schema({

    codigo_Rol:{
        type:ObjectId,
        ref: 'roles',
        required:true,
    },
    
    id_usuario: {
        type:ObjectId,
        ref: 'usuario',
        required: true
    },
    estado_rol: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('roles_has_usuario', userrolSchema);

