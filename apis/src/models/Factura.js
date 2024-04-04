const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    id_factura:{
        type:String,
        required:true,
    },

    id_usuario:{
        type:ObjectId,
        required:true,
    },
    
    Nombre_usuario: {
        type: String,
        required: true,
    },
    Apellido_usuario: {
        type: String,
        required: true,
    },
    Fecha_venta: {
        type: String,
        required: true,
    },
    Precio_subtotal_venta: {
        type: String,
        required: true,
    },
    Iva_productos: {
        type: String,
        required: false,
    },
    Precio_total_compra: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('factura', userSchema);
