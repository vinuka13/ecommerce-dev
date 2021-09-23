const User = require("../modules/user")
const catchAsyncErrors = require("../middlewear/catchAsyncErrors")
const ErrorHandler = require('../utilis/errorHandler')
const sendToken = require('../utilis/jwtToken')
const sendEmail = require('../utilis/sendEmail')
const crypto = require('crypto')

exports.registerUser = catchAsyncErrors( async function(req, res, next){

    const {name, email, password} = req.body

        const newUser = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: 'products/61oXGZ60GfL_fixco9',
                url: 'https://res.cloudinary.com/bookit/image/upload/v1614877995/products/61oXGZ60GfL_fixco9.jpg'
            }
        })

        sendToken(newUser, res)
}) 

//login user

exports.loginUser = catchAsyncErrors (async function(req, res, next) {
    const {email, password} = req.body

//check if the email and password is enterd 

if(!email || !password){
    return next(new ErrorHandler('Please enter email and password', 400))
}

//find the user from the db

 const newUser = await User.findOne({email}).select("+password")
     
    if(!newUser){
        return next(new ErrorHandler('Invalid email or password', 401))
     } 

     const isPasswordMatched = await newUser.comparePassword(password)

     if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password', 401))
     }

     sendToken(newUser, res)
})

//Forgot password

exports.forgotPassword = catchAsyncErrors (async function(req, res, next){

    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler('User with this email not found', 404))
    }

    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `your password reset token is: \n\n${resetUrl}\n\n`

    try {

        await sendEmail({
            email: user.email,
            subject: 'ecommerce password reset',
            message
        })

        res.send({
            success: true,
            message: `email send to: ${user.email}`
        })

    } catch (error){

        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

    }



})

//reset password 

exports.resetPassword = catchAsyncErrors(async function(req, res, next){

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler('Password rest token is invalid or expired', 400))
    }

    if(!req.body.password === req.body.conformPassword){
        return next(new ErrorHandler('Passwords dont match', 400))
    }

    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, res)
})

//get user profile

exports.getUserProfile = catchAsyncErrors(async function(req, res, next){

    const user = await User.findById(req.user.id)

    res.send({
        success: true,
        user
    })
})

//update password 

exports.updatePassword = catchAsyncErrors(async function(req, res, next){

    const user = await User.findById(req.user.id).select("+password")
    
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('Old passwword is inccorect', 400))
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user, res)


})

//update profile 

exports.updateUsername = catchAsyncErrors(async function(req, res, next){

    const update = {
        name : req.body.name,
        email : req.body.email 
    }

    const user = await User.findByIdAndUpdate(req.user.id, update, {
        new: true,
        runValidators: true
    })

    res.send({
        success: true,
    })
})
      
//logout 

exports.logout = catchAsyncErrors (async function(req, res, next){

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true 
    })

    res.send({
        success: true,
        message: 'logged out'
    })
})


//admin routes 

//get all users

exports.getAllUsers = catchAsyncErrors (async function(req, res, next){

    const users =await User.find()

    res.send({
        success: true,
        count: users.length,
        users
    })
})

//get user by id

exports.getUserById = catchAsyncErrors (async function(req, res, next){

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler('User does not exist', 400))
    }

    res.send({
        success: true,
        user
    })
})

//update users for admin

exports.updateUserAdmin = catchAsyncErrors(async function(req, res, next){

    const update = {
        name : req.body.name,
        email : req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true
    })

    if(!user){
        return next(new ErrorHandler('User does not exist', 400))
    }

    res.send({
        success: true,
        user
    })
})

//delete users for admin

exports.deleteUserById = catchAsyncErrors (async function(req, res, next){

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler('User does not exist', 400))
    }

    user.remove()

    res.send({
        success: true,
    })
})