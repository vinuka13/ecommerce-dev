const ErrorHandler = require('../utilis/errorHandler');

module.exports = function(err, req, res, next){
    err.statusCode = err.statusCode || 500;
    
  //mongoose ID error
    if(err.name === 'CastError') {
        res.send({
            success: false,
            message: `Reasource not found. Invalid: ${err.path}`
        })
    }

  //mongoose validation error  
     if(err.name === 'ValidationError') {
      
    const errorMessage = Object.values(err.errors).map(value => value.message)

         res.send({
             success: false,
             message: errorMessage.toString()
         })
     }


  //mongoose duplicate key error
     if(err.code === 11000){

        const message = `duplicate ${Object.keys(err.keyValues)} entered`

        res.send({
            success: false,
            message
        })
     }

  //jwt error

     if(err.name === 'JsonWebTokenError'){

        const message = 'Json web token is invalid'

        res.send({
            success: false,
            message
        })
     }

     if(err.name === 'TokenExpiresError'){

        const message = 'Json web token expired'

        res.send({
            success: false,
            message
        })
     }
    
  //other errors
    res.status(err.statusCode).json ({
        success: false,
        message: err.message || 'Internal server error',
        error: err,
        path: err.path,
        name: err.name,
        stack: err.stack
    })
   
    
    

}