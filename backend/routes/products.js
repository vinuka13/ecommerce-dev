const express = require('express');
const router = express.Router();
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/productControllers")
const { isAuthenticatedUser, authrizeRoles } = require('../middlewear/auth')


router.get('/products',isAuthenticatedUser, getProducts);
router.get('/product/:id', getSingleProduct)
router.post('/product/admin/new', isAuthenticatedUser,authrizeRoles('admin'), newProduct)
router.put('/product/admin/:id', isAuthenticatedUser,authrizeRoles('admin'), updateProduct)
router.delete('/product/admin/:id', isAuthenticatedUser,authrizeRoles('admin'), deleteProduct)


module.exports = router