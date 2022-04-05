/* importacion librerias */
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {logErrors,errorHandler,boomErrorHandler} = require('./src/middlewares/errors.handlers')


/* importacion de rutas del proyecto */
const routerApi=require('./src/routes')


const port=process.env.PORT
const app= express()

/* activacion del puerto por el cual correra el proyecto */
app.listen(port, console.log('port_active', port));

/* connectamos con la base de datos */

mongoose.connect( process.env.MONGODB_CONNECT)
  .then(()=>console.log('success connection with database'))
  .catch((error)=>console.error(error));

/* creacion de middleware */
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.use(express.json());

routerApi(app);





