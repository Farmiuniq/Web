const mongoose = require("mongoose");

const cateSchema = mongoose.Schema({
    id_categoria: {
        type: String,
        required: true
    },
    desc_categorias: {
        type: String,
        required: true
    }

});

const categorias = mongoose.model('categorias', cateSchema);

module.exports = categorias;