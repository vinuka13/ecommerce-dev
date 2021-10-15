const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxlength: [100, 'Product name cannaot exceed 100 charactors']
    },
    price : {
        type: Number,
        required: [true, 'Please enter product price'],
        maxlength: [5, 'Product peice cannot exceed 5 charactors'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    ratings : {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please enter the product category'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
            ],
        message: 'Please select correct category for the product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxlength: [5, 'Product stock cannot exceed 5 charactors'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
     reviews: [
         {
             user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
             },
             name: {
                 type: String,
                 required: true
             },
             rating: {
                 type: Number,
                 required: true
             },
             comment: {
                 type: String,
                 required: true
             }
         }
     ],
     user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
     },
     createdAt: {
         type: Date,
         default: Date.now
     }
})

module.exports = mongoose.model('Product', productSchema)