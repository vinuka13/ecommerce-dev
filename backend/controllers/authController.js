const User = require("../modules/user")

const catchAsyncErrors = require("../middlewear/catchAsyncErrors")



exports.registerUser = catchAsyncErrors( async function(req, res, next){

    const {name, email, password} = req.body

        const newUser =await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: 'products/61oXGZ60GfL_fixco9',
                url: 'https://res.cloudinary.com/bookit/image/upload/v1614877995/products/61oXGZ60GfL_fixco9.jpg'
            }
        })

        const token = newUser.getJwtToken()

        res.send({
            success: true,
            token
        })

  
  
}) 
      