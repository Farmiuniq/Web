const express = require('express');
const userrolSchema=require('../models/roles_has_usuario');
const router = express.Router();

router.post('/roles_has_usuario', async (req, res) => {
    try {
      const nuevoru = await userrolSchema.create(req.body);
      res.status(201).json({ message: 'se agrego la infromacion del la descripcion del rol', data: nuevoru });
    } catch (error) {
      console.error('Error al crear la infromacion del carro:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

  //BUSCAR GENERAL
  router.get('/roles_has_usuario', (req,res)=>{
    userrolSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectAll"}));
  });
  
  //BUSCAR ESPECIFICO
  router.get('/roles_has_usuario/:id',(req,res)=>{
    const {id} = req.params;
    userrolSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
  });
  
  //Actualizar
  router.put('/roles_has_usuario/:id',(req,res)=>{
    const {id} = req.params;
    const {codigo_Rol,id_usuario,estado_rol} = req.body;
    userrolSchema
    .updateOne({_id:id},{$set:{codigo_Rol,id_usuario,estado_rol}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"updateOne"}));
  });
  
  //DELETE
  
  router.delete('/roles_has_usuario/:id',(req,res)=>{
    const {id} = req.params;
    
    userrolSchema
    .deleteOne({_id:id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"deleteOne"}));
  });
  
  module.exports =router;