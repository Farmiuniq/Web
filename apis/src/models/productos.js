const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const productosSchema = mongoose.Schema({

    id_Productos:{
        type:String,
        required:true,
    },

    id_proveedor:{
        type: ObjectId,
        ref: 'proveedores',
        required:true,
    },
    
    Nomb: {
        type: String,
        required: true,
    },
    Marca: {
        type: String,
        required: false,
    },
    Forma_farmaceutica: {
        type: String,
        required: false,
    },
    Lote_fabricacion: {
        type: String,
        required: true,
    },
    Fecha_caducidad: {
        type: String,
        required: true,
    },
    Precio: {
        type: String,
        required: true,
    },
    stock_maximo: {
        type: String,
        required: true,
    },
    stock_minimo: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model('productos2', productosSchema);


