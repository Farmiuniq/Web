const express = require('express');
const facSchema=require('../models/Factura');

const router = express.Router();

router.post('/factura',(req,res)=>{
    //res.send("Ruta para crear usuario");

    const facDev = facSchema(req.body);
    facDev.save()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
});

module.exports =router;
//BUSCAR GENERAL
router.get('/factura', (req,res)=>{
    facSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectAll"}));
});

//BUSCAR ESPECIFICO
router.get('/factura/:id',(req,res)=>{
    const {id} = req.params;
    facSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
});

//Actualizar
router.put('/factura/:id',(req,res)=>{
    const {id} = req.params;
    const {id_factura,id_usuario,Nombre_usuario,Apellido_usuario,Fecha_venta,Precio_subtotal_venta,Iva_productos,Precio_total_compra} = req.body;
    facSchema
    .updateOne({_id:id},{$set:{id_factura,id_usuario,Nombre_usuario,Apellido_usuario,Fecha_venta,Precio_subtotal_venta,Iva_productos,Precio_total_compra}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"updateOne"}));
});

//DELETE

router.delete('/factura/:id',(req,res)=>{
    const {id} = req.params;
    facSchema
    .deleteOne({_id:id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"deleteOne"}));
});