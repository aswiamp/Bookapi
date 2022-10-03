const express= require('express');
const app = express();
require('express-async-errors')
const Books=require('./routes/books');
const connectDB=require('./db/connect');
const errorHandlerMiddleware=require('./middleware/error-handler')
require('dotenv').config();

//middleware
app.use(express.json());
app.use(errorHandlerMiddleware)

//routes
app.use('/api/v1/books',Books)


const port= process.env.PORT||4000

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);//db connection
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
start();