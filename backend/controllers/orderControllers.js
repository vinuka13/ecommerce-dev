const Order = require("../modules/orders");
const catchAsyncErrors = require("../middlewear/catchAsyncErrors")
const Product = require("../modules/product")
const ErrorHandler = require('../utilis/errorHandler')

//create new order

exports.newOrder = catchAsyncErrors (async function(req, res){

    const { shippingInfo,
            orderItems,
            paymentInfo, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        user: req.user._id,
        paidAt: Date.now()
    })

    res.send({
        success: true,
        order
    })

})


//get single order

exports.getOneOrder = catchAsyncErrors (async function(req, res, next){

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        return next(new ErrorHandler('Order not found', 404))
    }

    res.send({
        success: true,
        order
    })
})

//get orders of user

exports.myOrders = catchAsyncErrors (async (req, res, next) => {

    const orders = await Order.find({ user: req.user.id })
    console.log(req.user.id);

    res.send({
        success: true,
        orders
    })
})