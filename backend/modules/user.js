 const mongoose = require('mongoose')
 const validator = require('validator')
 

 const userSchema = {
     name: {
         type: String,
         required: true,
         maxLength: [30, 'Your name cannot exceed 30 characters']
     },
     email: {
         type: String,
         required: true,
         unique: true,
         validate: [validator.isEmail, 'Please enter valid email address']
     },
     password: {
         type: String,
         required: [true, 'Please enter your password'],
         minLength: [6, 'Your password cannot be shoter than 6 charactors'],
         select: false,
     },
     avatar: {
         public_id: {
             type: String,
             required: true
         },
      url: {
          type: String,
          required: true
      }   
     },
     role: {
         type: String,
         default: 'user'
     },
     createdAt: {
         type: Date,
         default: Date.now
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date
 }

 modules.export = mongoose.model('User', userSchema)