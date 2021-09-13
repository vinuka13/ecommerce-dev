const express = require('express');
const router = express.Router();
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/productControllers")


router.get('/products', getProducts);
router.get('/product/:id', getSingleProduct)
router.post('/product/admin/new', newProduct)
router.put('/product/admin/:id', updateProduct)
router.delete('/product/admin/:id', deleteProduct)


module.exports = router