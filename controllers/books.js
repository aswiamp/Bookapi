//importing the customErrors
const { CustomAPIError } = require("../errors/custom-errors");
const Book=require("../model/book");
const APIFeatures=require("../utills/apiFeatures")
const short=require('shortid')
const path=require("path");

const getAllBooks=async(req,res,next)=>
{  
    
  const features= new APIFeatures(Book.find(),req.query).paginate()//to find all books 
  const book=await features.query
  const total=await Book.countDocuments({"_id":{"$exists":true}
   })
  //console.log(total)

  res.status(200).json({status:"success",
  count:total,
  results:book.length,
  data:book,})
}
//creating a new book 
const  createBook=async(req,res)=>
{
  if (!req.files) {
    throw new CustomAPIError('No File Uploaded');
  }
  const bookImage = req.files.Imageurl;
  if (!bookImage.mimetype.endsWith('png')) {
    throw new CustomAPIError('Please Upload png Image');
  }
  const maxSize = 1024 * 1024;
  if (bookImage.size > maxSize) {
    throw new CustomAPIError('Please upload image smaller 1MB');
  }
  req.ui=short()
    const pathImage=req.ui+`${bookImage.name}`
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + pathImage
  )
  
    await bookImage.mv(imagePath);
  req.body.Imageurl=`/uploads/${pathImage}`
  
   
    const book=await Book.create(req.body)
    res.status(201).json({book})
}

const getBook= async(req,res)=>
{
    const {id:bookID}=req.params
    const book=await Book.findOne({_id:bookID})//finding one book using _id
    //if the book is not found then it returns an error
    if(!book)
    {
        throw new CustomAPIError(`no book with this id: ${bookID}`)

    }
    res.status(200).json({book})  
}

const updateBook= async (req, res) => {
    const { id: bookID } = req.params
  //to update the book properties 
    const book = await Book.findOneAndUpdate({ _id: bookID }, req.body, {
      new: true,
    })
  
    if (!book) {
      throw new CustomAPIError(`No book with id : ${bookID}`)
    }
  
    res.status(200).json({ book })
}
//deleting the book 
const deleteBook=async(req,res)=>
{
    const {id:bookID}=req.params

    const book= await Book.findOneAndDelete({_id:bookID})
    if(!book)
    {
      throw new CustomAPIError(`No book with id:${bookID}`)
    }
    res.status(200).json({ book})
}
//exporting all of these functions
module.exports={
    getAllBooks,getBook,createBook,updateBook,deleteBook
}