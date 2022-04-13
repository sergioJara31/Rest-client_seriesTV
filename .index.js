/* importacion librerias */
const express = require('express')
const mongoose = require('mongoose')
const { sentenceCase } = require('sentence-case')
const { ApplicationPage } = require('twilio/lib/rest/api/v2010/account/application')
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



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'tarea grupo de software sabados, ahora en la casa',
     from: '+19893129428',
     to: '+573116354327'
   })
  .then(message => console.log(message.sid));


const email=require('./src/models/email');

app.use(express.urlencoded({extended:false}));

app.post('/api/email/confirmacion',async (req, res, next )=>{
  try {
    res.json(await email.sendOrder(req.body));
  } catch (error) {
    next(error);
  }
});

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500 ;
  console.error(err.message, err.stack);
  res.status(statusCode).json({message: err.message});
  return;
})

routerApi(app)
