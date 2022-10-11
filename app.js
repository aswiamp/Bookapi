const express = require('express');
const app = express();
require('express-async-errors')
const fileUpload = require('express-fileupload');
const Auth=require('./routes/auth')
const Books = require('./routes/books');
const connectDB = require('./db/connect');
const notFoundMiddleware=require('./middleware/notFound')
const authenticateUser=require('./middleware/authentication')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config();

//middleware
app.use(express.json());

app.use(fileUpload({ useTempFiles: false }));

//routes
app.use('/api/v1/auth',Auth)
app.use('/api/v1/books',authenticateUser,Books)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
app.use(authenticateUser)

const port = process.env.PORT 

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