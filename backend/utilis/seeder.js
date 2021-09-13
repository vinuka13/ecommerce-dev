const Product = require('../modules/product');
const dotenv = require('dotenv');
const  connectDatabase = require('../config/database')
const products = require('../data/product.json')

dotenv.config({ path: 'backend/config/config.env'})

connectDatabase();

const seedProducts = async function(){
    try{
      await Product.deleteMany();
      console.log("Products got delete")
      await Product.insertMany(products)
      console.log("Products created")

      process.exit();

    } catch (err){
        console.log(err)
        process.exit();
    }
}

seedProducts();