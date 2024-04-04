const usersRoutes =require("./routers/usuario.js")
const tipoDocRoutes=require("./routers/tipoDocumento.js")
const rolRoutes=require("./routers/roles.js")
const producRoutes=require("./routers/productos.js")
const userolRoutes=require("./routers/roles_has_usuario.js")
const facRoutes=require("./routers/factura.js")
const cateRouters=require("./routers/categorias.js")
const provSchema= require("./routers/proveedores.js")
const Autenticacion= require("./routers/auth.js")
const express = require("express")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const path = require("path")

//swagger
const swaggerUI= require("swagger-ui-express");
const swaggerJsDoc= require("swagger-jsdoc");

const swaggerSpec = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Node MongoDB API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: [`${path.join(__dirname, "./routers/*.js")}`],
  };

// Habilitar CORS para todas las rutas


dotenv.config();

app.use(cors());

app.use(express.urlencoded({ extended: true }));



const mongoString = process.env.MONGODB;
const host = process.env.HOST;

console.log(mongoString);
console.log(host);

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api', usersRoutes)
app.use('/api', tipoDocRoutes)
app.use('/api', rolRoutes)
app.use('/api', provSchema)
app.use('/api', producRoutes)
app.use('/api', userolRoutes)
app.use('/api', facRoutes)
app.use('/api', cateRouters)
app.use('/api', Autenticacion)

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

  
const port = process.env.PORT || 3000;
app.listen(port,()=>
    console.log(`servidor corriendo en el puerto ${port}`)
    );
mongoose.connect(process.env.MONGODB).then(() => {
    console.log('Conectado a la bd en mongoDB Atlas')
}).catch((err) => {
    console.error(`Se produjo un error: ${err}`)
});
      
app.get('/',
    (req, res)=>{
        res.send('Bienvenido a mi API, esta es la ruta Ppa1');
    });      

    app.post('/recuperar', (req, res) => {
      const {email} = req.body;
      UserModel.findOne({email: email})
      .then(usuario => {
          if(!usuario) {
              return res.send({Status: "Userio not existed"})
          } 
          const token = jwt.sign({id: usuario._id}, "jwt_secret_key", {expiresIn: "1d"})
          var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                usuario: 'alexandraalarcon200416@gmail.com',
                pass: 'alexandra200416*'
              }
            });
            
            var mailOptions = {
              from: '"Forgot password :)" <alexandraalarcon200416@gmail.com>',
              to: 'recuperar.gmail',
              subject: 'Reset Password Link',
              text: `http://localhost:3000/reset_password/${usuario._id}/${token}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                return res.send({Status: "Success"})
              }
            });
      })
  })
  app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body
  
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
  })



