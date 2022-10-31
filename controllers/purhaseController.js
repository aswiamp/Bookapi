const Purchase = require("../model/purchase");
const Book =require("../model/book");
const mongoose = require("mongoose");
const conn = mongoose.connection;
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/custom-errors");
//const purchase = require("../models/purchase")


const checkAvailability = async (req, res) => {
    const data = await Book.findById(req.params.id);
    if (!data) {
        throw new CustomAPIError("No book with id");
    }
    if (data.quantity === 0) {
        throw new CustomAPIError("Book is out of stock");
    }
    res.status(StatusCodes.CREATED).json({
        message: "Book is available.details about the book is given",
        details: data,
    });
};

//purchase book
const purchaseBook=async(req,res)=>{
    const t = await conn.startSession();
    try{
        await t.startTransaction();
    const details = await Book.findById(req.params.id);
    if(!details){
        throw new CustomAPIError("No book with this id,please enter another id");
    }
    const pri = details.price; 
    const purchaseDetails = await Purchase.create((
        {
        userId : req.user.userId,
        bookId : req.params.id,
        quantity : req.body.quantity,
        totalPrice : req.body.quantity * pri
        }
    ),{t});
     const bookQty =  details.quantity;
     const itemQty=req.body.quantity;
    if(bookQty-itemQty < 0) {
        throw new CustomAPIError('Required number of books unavailable');
    }
    const {
        params: { id: bookID },

    } = req;
    await Book.findByIdAndUpdate({_id:bookID},{ $inc:{quantity:-itemQty}},{t});  
  
    
    res.status(StatusCodes.CREATED).json({purchaseDetails});
    await t.commitTransaction();
    
}
catch(err){
    //console.log(err)
    await t.abortTransaction();
    throw new CustomAPIError(err);
          
    }
     t.endSession();
};
const purchaseReport=async(req,res)=>{
    
    const purchase=await Purchase.aggregate([{
        //join books
        $lookup: {
            from : 'books', 
            localField : "bookId", 
            foreignField : "_id", 
            as: "book_data", 
        }
    },{
        //join users
        $lookup: {
            from : 'users',
            localField : "userId",
            foreignField : "_id",
            as: "user_data"
        }
    },{
        $project : {
            __v : 0,
            book_details : {
                _id : 0,
                quantity : 0,
            },
            user_details : {
                _id : 0,
                password : 0
            }
        }
    }]);
    res.status(StatusCodes.CREATED).json({purchase,count:purchase.length});


   
    
};



  
module.exports = {checkAvailability,purchaseBook,purchaseReport} ;