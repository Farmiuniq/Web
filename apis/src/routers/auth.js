const UserSchema = require('../models/usuario');
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const correoelectronico = require('../modulos/barril');
const { enviarCorreo } = require('../modulos/barril');
const { Router } = express;

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { id_usuario, password } = req.body;
    const user = await UserSchema.findOne({ id_usuario });

    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    // Comparar la contraseña proporcionada con la contraseña almacenada desencriptada
    const contraseñaValida = await bcrypt.compare(password, user.password);

    if (!contraseñaValida) return res.status(401).json({ message: 'Contraseña incorrecta' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

/*router.post('/registrar', async (req, res) => {
  try {
    const { nombre, apellido, id_usuario, telefono, email, password } = req.body;
    console.log("Soy Thanos")
    // Verificar si el usuario ya existe
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
      nombre: nombre,
      apellido: apellido,
      id_usuario: id_usuario,
      telefono: telefono,
      email: email,
      password: contrasenaEncriptada,
    });

    const result = await data.save();
    res.status(200).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
*/

router.post('/recuperar', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserSchema.findOne({ email });

    if (!user) return res.status(404).json({ message: 'El correo electrónico no existe en nuestra base de datos' });

    const newPassword = crypto.randomBytes(12).toString('hex');
    const contrasenaEncriptada = await bcrypt.hash(newPassword, 10);

    await UserSchema.updateOne({ email }, { password: contrasenaEncriptada });

    const asunto = 'Recuperación de Cuenta';
    const contenido = {
      usuario: user.id_usuario,
      contrasena: newPassword
    }
    await enviarCorreo(email, asunto, contenido);

    res.status(200).json({ message: 'Se han enviado tus credenciales a tu correo electrónico' });
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ message: 'Hubo un error al procesar tu solicitud' });
  }
});

module.exports = router;
