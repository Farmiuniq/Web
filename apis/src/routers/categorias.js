const cateSchema= require ('../models/categorias');
const dotenv = require("dotenv");
const express = require("express");
const { Router } = express;
dotenv.config();
const router = Router();

router.post('/categorias',async (req,res)=>{
    try{
        const{id_categorias,desc_categorias}= req.body
        const cate = new cateSchema({
            id_categoria: id_categorias,
            desc_categorias: desc_categorias,
        });

        const result = await cate.save();   
    res.status(200).json({message:"Registro exítoso"});
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports =router;



//BUSCAR GENERAL

/*
routers.get('/categorias', (req,res)=>{
    cateSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectAll"}));
});

//BUSCAR ESPECIFICO
routers.get('/categorias/:id',(req,res)=>{
    const {id} = req.params;
    cateSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
});

//Actualizar
routers.put('/categorias/:id',(req,res)=>{
    const {id} = req.params;
    const {id_categoria,desc_categorias} = req.body;
    cateSchema
    .updateOne({_id:id},{$set:{id_categoria,desc_categorias}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"updateOne"}));
});

//DELETE
routers.delete('/categorias/:id',(req,res)=>{
    const {id} = req.params;
    cateSchema
    .deleteOne({_id:id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"deleteOne"}));
});
*/