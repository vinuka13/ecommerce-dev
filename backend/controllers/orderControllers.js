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

exports.myOrders = catchAsyncErrors (async function(req, res, next) {

    const orders = await Order.find({ user: req.user.id })
    console.log(req.user.id);

    if(!orders){
        return next(new ErrorHandler(`No orders for ${req.user.name}`))
    }

    res.send({
        success: true,
        orders
    })
})

//get all orders 
exports.getAllProducts = catchAsyncErrors (async function(req, res, next){

    const orders = await Order.find() 

    let totalAmount = 0

    orders.forEach(function(docs, err){
        totalAmount += docs.totalPrice
    })

    res.send({
        success: true,
        count: orders.length,
        totalPrice: totalAmount,
        orders
    })
})

//upade the order status and product stock
exports.updateStatus = catchAsyncErrors (async function(req, res, next){

    const order = await Order.findById(req.params.id)
    
    if(!order){
      return next(new ErrorHandler('Order not found', 404)) 
    }

    if(order.orderStatus === 'Deliverd'){
          return next(new ErrorHandler('Order is deliverd'), 400)
    }
    
    order.orderItems.forEach(async function(docs, err){
        await updateStock(docs.product, docs.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now() 

    await order.save()

    res.send({
        success: true,
    })

})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}

//delete order 
exports.deleteOrder = catchAsyncErrors (async function(req, res, next){
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('Order not found', 404))
    }

    order.remove()

    res.send({
        success: true
    })
})