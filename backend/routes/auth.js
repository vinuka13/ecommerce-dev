const express = require('express');
const router = express.Router();
const {registerUser} = require("../controllers/authController")

router.post('/register/new', registerUser)

module.exports = router