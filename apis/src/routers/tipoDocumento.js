const express = require('express');
const tdSchema = require('../models/tipoDocumento');

const router = express.Router();

router.post('/tipoDocumento', async (req, res) => {
    // res.send("Ruta para crear usuario");

    try {
        const nuevotd = await tdSchema.create(req.body);
        res.status(201).json({ message: 'se agrego la infromacion del taqueo', data: nuevotd });
      } catch (error) {
        console.error('Error al crear la infromacion del carro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    });

module.exports =router;
//BUSCAR GENERAL
router.get('/tipoDocumento', (req,res)=>{
    tdSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectAll"}));
});

//BUSCAR ESPECIFICO
router.get('/tipoDocumento/:id',(req,res)=>{
    const {id} = req.params;
    tdSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
});

//Actualizar
router.put('/tipoDocumento/:id',(req,res)=>{
    const {id} = req.params;
    const {t_doc,desc_tdoc,tdoc_estado} = req.body;
    tdSchema
    .updateOne({_id:id},{$set:{t_doc,desc_tdoc,tdoc_estado}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"updateOne"}));
});

//DELETE

router.delete('/tipoDocumento/:id',(req,res)=>{
    const {id} = req.params;
    tdSchema
    .deleteOne({_id:id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"deleteOne"}));
});