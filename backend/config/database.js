const mongoose = require('mongoose')

const connectDatabase = function(){
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
}

module.exports = connectDatabase;
