const express = require('express');
const router = express.Router();
const {newOrder, getOneOrder, myOrders} = require("../controllers/orderControllers")
const { isAuthenticatedUser } = require('../middlewear/auth')

router.post('/orders/new',isAuthenticatedUser, newOrder)
router.get('/orders/:id',isAuthenticatedUser, getOneOrder)
router.get('/orders/me',isAuthenticatedUser, myOrders)

module.exports = router