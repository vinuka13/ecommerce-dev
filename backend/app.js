const express = require("express");
const products = require('./routes/products')
const errorMidleWeare = require('./middlewear/error')


const app = express();
app.use(express.json());
app.use('/api/v1', products)
app.use(errorMidleWeare)

module.exports = app
