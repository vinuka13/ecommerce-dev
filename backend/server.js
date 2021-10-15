const app = require('./app')
const connectDatabase = require("./config/database")
const dotenv = require('dotenv')

process.on('uncaughtException', function(err){
   console.log(`ERROR: ${err.message}`)
   console.log(`Shutting down deu to uncaught exception`)
   process.exit(1)
})

dotenv.config({ path: './config/config.env'})

connectDatabase();



const server =  app.listen(3080, function(){
   console.log('server is running')
})

process.on('unhandledRejection', function(err){
   console.log(`ERROR: ${err.stack}`);
   console.log(`Shutting down the server due to unhadled promise rejection`);
   server.close(function(){
      process.exit(1)
   })
})