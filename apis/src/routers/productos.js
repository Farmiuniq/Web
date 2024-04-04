const express = require('express');
const productosSchema=require('../models/productos');

const router = express.Router();

//crear producto 
/**
 * @swagger
 *  components:
 *    schemas:
 *      productos:
 *        type: object
 *        properties:
 *          id_Productos: 
 *            type: string
 *            description: codigo proveedor 
 *          id_proveedor:
 *            type: string
 *            description: Nombre del proveedor
 *          Nomb:
 *            type: string
 *            description: telefeno del proveedor
 *          Marca:
 *            type: string
 *            description: email del proveedor
 *          Forma_farmaceutica: 
 *            type: string
 *            description: codigo proveedor 
 *          Lote_fabricacion:
 *            type: string
 *            description: Nombre del proveedor
 *          Fecha_caducidad:
 *            type: string
 *            description: telefeno del proveedor
 *          Precio:
 *            type: string
 *            description: email del proveedor
 *          stock_maximo:
 *            type: string
 *            description: telefeno del proveedor
 *          stock_minimo:
 *            type: string
 *            description: email del proveedor
 *        required:
 *            - id_Productos
 *            - id_proveedor
 *            - Nomb
 *            - Marca
 *            - Forma_farmaceutica
 *            - Lote_fabricacion
 *            - Fecha_caducidad
 *            - Precio
 *            - stock_maximo
 *            - stock_minimo
 *        example:
 *            id_Productos: P12
 *            id_proveedor: P1
 *            Nomb: Ibufrofeo
 *            Marca: ibuprofeno@gmail.com
 *            Forma_farmaceutica: solida
 *            Lote_fabricacion: 12/12/23
 *            Fecha_caducidad: 12/12/2026
 *            Precio: 2000
 *            stock_maximo: 50
 *            stock_minimo: 10
 */

/**
 * @swagger
 * /api/productos2:
 *  post:
 *    summary: crear un nuevo producto
 *    tags: [productos]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/productos'
 *    responses:
 *      200:  
 *        description: nuevo proveedor creado!
 * 
 */

router.post('/productos2', async (req, res) => {
    try {
      const nuevoproducto = await productosSchema.create(req.body);
      res.status(201).json({ message: 'se agrego la infromacion del proveedor', data: nuevoproducto });
    } catch (error) {
      console.error('Error al crear la infromacion del carro:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

module.exports =router;
//BUSCAR GENERAL
/**
 * @swagger
 * /api/productos2:
 *  get:
 *    summary: traeme todos los productos
 *    tags: [productos]
 *    responses:
 *      200:  
 *        description: todos los productos!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#/components/schemas/productos'
 * 
 */
router.get('/productos2', (req,res)=>{
    productosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectAll"}));
});

//BUSCAR ESPECIFICO
/**
 * @swagger
 * /api/productos2/{id}:
 *  get:
 *    summary: traeme un producto
 *    tags: [productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id del producto
 *    responses:
 *      200:  
 *        description: un producto!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/productos'
 *      404:
 *        description: usuario no identidicado
 */
router.get('/productos2/:id',(req,res)=>{
    const {id} = req.params;
    productosSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
});

//Actualizar
/**
 * @swagger
 * /api/productos2/{id}:
 *  put:
 *    summary: actualizar un producto
 *    tags: [productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id del producto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/productos'
 *    responses:
 *      200:  
 *        description: producto actualizado!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/productos'
 *      404:
 *        description: usuario no identidicado
 */
router.put('/productos2/:id',(req,res)=>{
    const {id} = req.params;
    const {id_Productos,Nomb,Marca,Forma_farmaceutica,Lote_fabricacion,Fecha_caducidad,Precio,stock_maximo,stock_minimo} = req.body;
    productosSchema
    .updateOne({_id:id},{$set:{id_Productos,Nomb,Marca,Forma_farmaceutica,Lote_fabricacion,Fecha_caducidad,Precio,stock_maximo,stock_minimo}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"updateOne"}));
  });

//DELETE
/**
 * @swagger
 * /api/productos2/{id}:
 *  delete:
 *    summary: Eliminar un producto
 *    tags: [productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id del producto
 *    responses:
 *      200:  
 *        description: producto eliminado
 *      404:
 *        description: producto no identidicado
 */
router.delete('/productos2/:id',(req,res)=>{
    const {id} = req.params;
    productosSchema
    .deleteOne({_id:id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error, query:"deleteOne"}));
});
