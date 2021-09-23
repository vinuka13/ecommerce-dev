 const mongoose = require('mongoose')
 const validator = require('validator')
 const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')
 const crypto = require('crypto')

 const userSchema = new mongoose.Schema ({
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
         minlength: [6, 'Your password cannot be shoter than 6 charactors'],
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
 })

//encrypt password before saving

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//compare password from bcrypt

userSchema.methods.comparePassword = function(plainPassword){
    return bcrypt.compare(plainPassword, this.password)
}


//return jwt token

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//create reset password token

userSchema.methods.getResetPasswordToken = function(){
    //genarate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}


 module.exports = mongoose.model('User', userSchema)