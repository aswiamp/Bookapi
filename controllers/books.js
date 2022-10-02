//importing the customErrors
const { CustomAPIError, createCustomError } = require("../errors/custom-errors");
const Book=require("../model/book");



const getAllBooks=async(req,res)=>
{
    const book= await Book.find()//to find all books 
    res.status(200).json({book})
}
//creating a new book ,by using  datas that we provided
const  createBook=async(req,res,next)=>
{

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
        return next(createCustomError(`no book with this id:404 ${bookID}`,))

    }
    res.status(200).json({book})
}

const updateBook= async (req, res) => {
    const { id: bookID } = req.params
  //updating the book properties using _id
    const book = await Book.findOneAndUpdate({ _id: bookID }, req.body, {
      new: true,
    })
  
    if (!book) {
      return next(createCustomError(`No book with id : ${bookID}`, 404))
    }
  
    res.status(200).json({ book })
}
//deleting the book for the particular mentioned id
const deleteBook=async(req,res)=>
{
    const {id:bookID}=req.params

    const book= await Book.findOneAndDelete({_id:bookID})
    if(!book)
    {
        return next(createCustomError(`No book with id:${bookID}`,404))
    }
    res.status(200).json({ book})
}
//exporting all of these functions
module.exports={
    getAllBooks,getBook,createBook,updateBook,deleteBook
}