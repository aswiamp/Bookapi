const express = require('express');
const app = express();
require('express-async-errors')
const fileUpload = require('express-fileupload');
const Books = require('./routes/books');
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config();

//middleware
app.use(express.json());

app.use(fileUpload({ useTempFiles: false }));

//routes
app.use('/api/v1/books', Books)

app.use(errorHandlerMiddleware)
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