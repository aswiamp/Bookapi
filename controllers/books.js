//importing the customErrors
const { CustomAPIError } = require("../errors/custom-errors");
const Book=require("../model/book");

const getAllBooks=async(req,res)=>
{  
    const book= await Book.find()//to find all books 
    res.status(200).json({book})
}
//creating a new book 
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
        throw new CustomAPIError(`no book with this id: ${bookID}`,404)

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
      throw new CustomAPIError(`No book with id : ${bookID}`, 404)
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
      throw new CustomAPIError(`No book with id:${bookID}`,404)
    }
    res.status(200).json({ book})
}
//exporting all of these functions
module.exports={
    getAllBooks,getBook,createBook,updateBook,deleteBook
}