const express = require('express');
const UserSchema = require('../models/usuario');
const bcrypt = require('bcrypt');

const router = express.Router();


router.post('/usuario', async (req, res) => {
    try {
      const { t_doc, id_usuario, nombre, email, password } = req.body;

      const usuarioExistente = await UserSchema.findOne({ id_usuario });
      const usuarioExistenteCorreo = await UserSchema.findOne({ email });
  
      if (usuarioExistente && usuarioExistenteCorreo) return res.status(400).json({ message: 'Nombre de usuario y correo ya están registrados' });
      if (usuarioExistente) return res.status(400).json({ message: 'Id de usuario ya registrado' });
      if (usuarioExistenteCorreo) return res.status(400).json({ message: 'Correo ya registrado' });
  
      // Encriptar la contraseña antes de guardarla en la base de datos
      const contrasenaEncriptada = await bcrypt.hash(password, 10);
      console.log(contrasenaEncriptada);
      // Crear un nuevo usuario con la contraseña encriptada
      const data = new UserSchema({
        t_doc: t_doc,
        id_usuario: id_usuario,
        nombre: nombre,
        email: email,
        password: contrasenaEncriptada,
      });
      
      const result = await data.save();
      res.status(200).json({message:"Registro exítoso"});
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

// Buscar todos los usuarios
router.get('/usuario', (req, res) => {
    UserSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error, query: 'selectAll' }));
});

// Buscar usuario por ID
router.get('/usuario/:id', (req, res) => {
    const { id } = req.params;
    UserSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error, query: 'selectOne' }));
});

// Actualizar usuario por ID
router.put('/usuario/:id', (req, res) => {
    const { id } = req.params;
    const { t_doc, id_usuario, nombre, email, password, rol } = req.body;
    UserSchema
        .updateOne({ _id: id }, { $set: { t_doc,id_usuario, nombre, email, password, rol } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error, query: 'updateOne' }));
});

// Eliminar usuario por ID
router.delete('/usuario/:id', (req, res) => {
    const { id } = req.params;
    UserSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error, query: 'deleteOne' }));
});

module.exports = router;