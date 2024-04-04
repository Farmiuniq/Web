const express = require('express');
const rolSchema=require('../models/roles');

const routers = express.Router();

routers.post('/roles', async (req, res) => {
    try {
      const nuevorol = await rolSchema.create(req.body);
      res.status(201).json({ message: 'se agrego la infromacion del los roles', data: nuevorol });
    } catch (error) {
      console.error('Error al crear la infromacion del rol:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

module.exports =routers;
//BUSCAR GENERAL
routers.get('/roles', (req,res)=>{
    rolSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectAll"}));
});

//BUSCAR ESPECIFICO
routers.get('/roles/:id',(req,res)=>{
    const {id} = req.params;
    rolSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
});

//Actualizar
routers.put('/roles/:id',(req,res)=>{
    const {id} = req.params;
    const {codigo_Rol,desc_Rol} = req.body;
    rolSchema
    .updateOne({_id:id},{$set:{codigo_Rol,desc_Rol}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"updateOne"}));
});

//DELETE

routers.delete('/roles/:id',(req,res)=>{
    const {id} = req.params;

    rolSchema
    .deleteOne({_id:id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"deleteOne"}));
});