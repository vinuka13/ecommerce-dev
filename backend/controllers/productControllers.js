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
   const productsCount = await Product.countDocuments()
  
   const apiFeatures = new APIFeatures(Product.find(), req.query)
   .search()
   .filter()
   .pagination(resPerPage)
   

   const products = await apiFeatures.query

    res.send({
        success: true,
        products,
        productsCount
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

// create reviews => /reviews

exports.createReview = catchAsyncErrors (async function(req, res){

    const {rating, comment, productId} = req.body

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(function(r){
        return r.user.toString() === req.user.id.toString()
    })

    if(isReviewed){

                isReviewed.rating = rating,
                isReviewed.comment = comment
           
    } else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length

        }
        

    product.ratings = product.reviews.reduce(function(acc, item){
        return item.rating + acc , 0
    }) / product.numOfReviews

    product.save({ validateBeforeSave: false })

    res.send({
        success: true
    })
})

//get reviews of product 

exports.getProductReviews = catchAsyncErrors (async function(req, res){

    const product = await Product.findById(req.query.id)
    const review = product.reviews
    

    res.send({
        success: true,
        review
    })
})

//delete product 

exports.deleteReview = catchAsyncErrors (async function(req, res){

    const product = await Product.findById(req.query.id)
    
    const reviews = product.reviews.filter(function(element){
        return element.id.toString() !== req.query.reviewId.toString()
    })
   
     const numOfReviews = reviews.length;

     const ratings = product.reviews.reduce(function(acc, item){
        return item.rating + acc , 0
    }) / reviews.length
    console.log(ratings);

    await Product.findByIdAndUpdate(req.query.id, {
        reviews,
        numOfReviews,
        ratings }, {
            new: true,
            runValidators: true
        }
    )

    res.send({
        success: true
    })
})