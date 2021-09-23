const express = require("express");
const products = require('./routes/products')
const auth = require('./routes/auth')
const order = require('./routes/orders')
const errorMidleWeare = require('./middlewear/error')
const cookieParser = require('cookie-parser')


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', products)
app.use('/api/v1/', auth)
app.use('/api/v1/', order)
app.use(errorMidleWeare)

module.exports = app
