const express = require('express');
const router = express.Router();
const {newOrder, getOneOrder, myOrders, getAllProducts, updateStatus, deleteOrder} = require("../controllers/orderControllers")
const { isAuthenticatedUser, authrizeRoles,  } = require('../middlewear/auth')

router.post('/orders/new',isAuthenticatedUser, newOrder)
router.get('/orders/me',isAuthenticatedUser, myOrders)
router.get('/order/:id',isAuthenticatedUser,authrizeRoles('admin'), getOneOrder)
router.get('/orders/admin/all',isAuthenticatedUser,authrizeRoles('admin'), getAllProducts )
router.put('/order/admin/update/:id',isAuthenticatedUser,authrizeRoles('admin'),updateStatus )
router.delete('/order/admin/delete/:id', isAuthenticatedUser, authrizeRoles('admin'), deleteOrder)

module.exports = router