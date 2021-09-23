const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require('../utilis/errorHandler')
const jwt = require('jsonwebtoken');
const User = require("../modules/user");

exports.isAuthenticatedUser = catchAsyncErrors(async function(req, res, next){

    const { token } = req.cookies

   if(!token){
    return next(new ErrorHandler('User logged out', 400))
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    req.user = await User.findById(decoded.id)

   next()
})

exports.authrizeRoles = (...roles) => {
  return  (req,res, next) => {
        if(!roles.includes(req.user.role)){   
            return next(new ErrorHandler(`Your roll is not tasty: ${req.user.role}`, 403))
        }
        next()
    }
}