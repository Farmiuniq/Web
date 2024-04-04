const express = require('express');
const provSchema=require('../models/proveedores');

const router = express.Router();

//crear proveedor 
/**
 * @swagger
 *  components:
 *    schemas:
 *      proveedores:
 *        type: object
 *        properties:
 *          id_proveedores: 
 *            type: string
 *            description: codigo proveedor 
 *          Nomb_proveedor:
 *            type: string
 *            description: Nombre del proveedor
 *          Tel_proveedor:
 *            type: string
 *            description: telefeno del proveedor
 *          Email_proveedor:
 *            type: string
 *            description: email del proveedor
 *        required:
 *            - id_proveedores
 *            - Nomb_proveedor
 *            - Tel_proveedor
 *            - Email_proveedor
 *        example:
 *            id_proveedores: P12
 *            Nomb_proveedor: Farmatodo
 *            Tel_proveedor: 6017469000
 *            Email_proveedor: Farmatodo@gmail.com
 */

/**
 * @swagger
 * /api/proveedores:
 *  post:
 *    summary: crear un nuevo proveedor
 *    tags: [proveedores]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/proveedores'
 *    responses:
 *      200:  
 *        description: nuevo proveedor creado!
 * 
 */
router.post('/proveedores', async (req, res) => {
    try {
      const nuevoprov = await provSchema.create(req.body);
      res.status(201).json({ message: 'se agrego la infromacion del proveedor', data: nuevoprov });
    } catch (error) {
      console.error('Error al crear la infromacion del carro:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

module.exports =router;
//BUSCAR GENERAL
/**
 * @swagger
 * /api/proveedores:
 *  get:
 *    summary: traeme todos los proveedor
 *    tags: [proveedores]
 *    responses:
 *      200:  
 *        description: todos los proveedores!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#/components/schemas/proveedores'
 * 
 */
router.get('/proveedores', (req,res)=>{
    provSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectAll"}));
});

//BUSCAR ESPECIFICO
/**
 * @swagger
 * /api/proveedores/{id}:
 *  get:
 *    summary: traeme un proveedor
 *    tags: [proveedores]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id del proveedor
 *    responses:
 *      200:  
 *        description: un proveedor!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/proveedores'
 *      404:
 *        description: usuario no identidicado
 */
router.get('/proveedores/:id',(req,res)=>{
    const {id} = req.params;
    provSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
});

//Actualizar
/**
 * @swagger
 * /api/proveedores/{id}:
 *  put:
 *    summary: actualizar un proveedor
 *    tags: [proveedores]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id del proveedor
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/proveedores'
 *    responses:
 *      200:  
 *        description: proveedor actualizado!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/proveedores'
 *      404:
 *        description: usuario no identidicado
 */
router.put('/proveedores/:id',(req,res)=>{
    const {id} = req.params;
    const {id_proveedores,Nomb_proveedor,Tel_proveedor,Email_proveedor} = req.body;
    provSchema
    .updateOne({_id:id},{$set:{id_proveedores,Nomb_proveedor,Tel_proveedor,Email_proveedor}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"updateOne"}));
});

//DELETE
/**
 * @swagger
 * /api/proveedores/{id}:
 *  delete:
 *    summary: Eliminar un proveedor
 *    tags: [proveedores]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id del proveedor
 *    responses:
 *      200:  
 *        description: proveedor eliminado
 *      404:
 *        description: usuario no identidicado
 */
router.delete('/proveedores/:id',(req,res)=>{
    const {id} = req.params;
    provSchema
    .deleteOne({_id:id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"deleteOne"}));
});