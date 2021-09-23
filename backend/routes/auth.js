const express = require('express');
const router = express.Router();
const {registerUser,
     loginUser, 
     logout, 
     forgotPassword, 
     resetPassword, 
     getUserProfile,
     updatePassword, 
     updateUsername, 
     getAllUsers,
     getUserById,
     updateUserAdmin,
     deleteUserById
    } = require("../controllers/authController")
const { isAuthenticatedUser, authrizeRoles } = require('../middlewear/auth')

router.post('/register/new', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)

router.post('/password/forgot', forgotPassword )
router.put('/password/reset/:token', resetPassword)
router.post('/password/update', isAuthenticatedUser, updatePassword)

router.get('/me',isAuthenticatedUser,  getUserProfile)
router.put('/me/update',isAuthenticatedUser, updateUsername)

router.get('/admin/users',isAuthenticatedUser, authrizeRoles('admin'),  getAllUsers)
router.get('/admin/user/:id',isAuthenticatedUser, authrizeRoles('admin'), getUserById)
router.put('/admin/user/:id',isAuthenticatedUser,authrizeRoles('admin'),updateUserAdmin )
router.delete('/admin/user/:id',isAuthenticatedUser,authrizeRoles('admin'), deleteUserById)


module.exports = router