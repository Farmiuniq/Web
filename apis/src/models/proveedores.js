const mongoose = require("mongoose");

const provSchema = mongoose.Schema({

    id_proveedores:{
        type:String,
        required:true,
    },

    Nomb_proveedor:{
        type:String,
        required:true,
    },
    
    Tel_proveedor: {
        type: String,
        required: true,
    },
    Email_proveedor: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('proveedores', provSchema);
