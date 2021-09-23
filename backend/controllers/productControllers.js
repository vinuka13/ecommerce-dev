const Product = require('../modules/product')
const ErrorHandler = require('../utilis/errorHandler')
const catchAsyncErrors = require("../middlewear/catchAsyncErrors")
const APIFeatures = require("../utilis/apiFeatures")


exports.newProduct = catchAsyncErrors (async function(req, res, next){

    req.body.user = req.user.id

    const product = await Product.create(req.body);

    res.send({
        success: true,
        product
    })
})


exports.getProducts = catchAsyncErrors (async function(req,res){

   const resPerPage = 4;
  
   const apiFeatures = new APIFeatures(Product.find(), req.query)
   .search()
   .filter()
   .pagination(resPerPage)
   

   const products = await apiFeatures.query

    res.send({
        success: true,
        count: products.length,
        products
    })
})

exports.getSingleProduct = catchAsyncErrors (async function(req, res, next) {

    const product = await Product.findById(req.params.id)

    if(product){
        res.send({
           success: true,
           product
        })
    } 

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    
    }


})

exports.updateProduct =catchAsyncErrors (async function(req, res){

  
    let product = await Product.findById(req.params.id)


    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
     runValidators: true
    })

    res.send({
        success: true,
        product
    })
   

})

exports.deleteProduct = catchAsyncErrors (async function(req, res){
    
    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Product.findOneAndRemove(req.params.id)

    res.send({
        success: true,
        message: "Product deleted"
    })

    
})