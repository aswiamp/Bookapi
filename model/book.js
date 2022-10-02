const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'please provide name']
             },
        Imageurl: {

            
            type:String
    

        },
        Author:{
            type:String,
            required:[true,'please provide author name']
        },
        pages:{
            type:Number
        },
        price:{
            type:Number,
            required:[true,'price must be specified']
        },
        }  
)
module.exports=mongoose.model('book',bookSchema)