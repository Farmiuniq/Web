function generarHTML(contenido) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Correo de Farmacia</title>
      <!-- Bootstrap CSS -->
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #007bff; /* Azul */
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header img {
          max-width: 200px;
        }
        .content {
          padding: 20px;
        }
        .content p {
          margin-bottom: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://static.wikia.nocookie.net/p__/images/e/e3/Teemo_Render_2.png/revision/latest?cb=20210407171219&path-prefix=protagonist" class="img-fluid" alt="Teemo de League of Legends">
        </div>
        <div class="content">
          <p>Estimado usuario,</p>
          <p>Gracias por registrarte en nuestra farmacia. A continuación, te proporcionamos tus datos de inicio de sesión:</p>
          <p><strong>Usuario:</strong> ${contenido.usuario}</p>
          <p><strong>Contraseña:</strong> ${contenido.contrasena}</p>
          <p>Por favor, guárdalos en un lugar seguro.</p>
        </div>
        <div class="footer">
          <p>¡Gracias por confiar en nosotros!</p>
        </div>
      </div>
      <!-- Bootstrap JS (optional) -->
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </body>
    </html>
  `;
}

module.exports = { generarHTML };
