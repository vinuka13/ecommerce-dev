const express = require("express");
const products = require('./routes/products')
const auth = require('./routes/auth')
const errorMidleWeare = require('./middlewear/error')


const app = express();
app.use(express.json());
app.use('/api/v1', products)
app.use('/api/v1/', auth)
app.use(errorMidleWeare)

module.exports = app
