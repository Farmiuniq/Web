const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    codigo_Rol: {
        type: String,
        required: true
    },
    
    desc_Rol: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('roles', userSchema);