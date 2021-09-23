const sendToken = function(newUser, res){

    //create jwt token 
    const token = newUser.getJwtToken()

    //options 
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly : true
    }

    res.cookie('token', token, options).json({
        success: true,
        token,
        newUser
    })
}

module.exports = sendToken