const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { generarHTML } = require('./html');

dotenv.config();

async function enviarCorreo(destinatario, asunto, contenido) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  const mailOptions = {
    from: process.env.email,
    to: destinatario,
    subject: asunto,
    html: generarHTML(contenido),
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { enviarCorreo };
