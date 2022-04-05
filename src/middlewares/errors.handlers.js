
/* funcion que permite visualizar los errores por consola */
const logErrors= (err,req,res,next)=>{
  console.log(err);
  next(err);

};

/* esta funcion la podemos llamar desde el serviio para que nos muestre en caso de error
el status 404 */
const errorHandler= (err,req,res,next)=>{
  res.status(404).json({
    message: err.message,
    stack: err.stack,
  });
};

/* usa la libreria hapi/boom par manejo de erroes en http */
const boomErrorHandler= (err,req,res,next)=>{
  if(err.isBoom){
    const {output}= err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

module.exports= {logErrors,errorHandler,boomErrorHandler};