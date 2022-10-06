const mongoose = require("mongoose");
const joi=require('joi');
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

bookSchema.methods.joiValidate=function(obj)
{


const valSchema=joi.object({

    name:joi.string().required().min(6).max(56),
    Imageurl:joi.string(),
    Author:joi.string().required().min(10).max(30),
    pages:joi.number().min(100).max(555),
    price:joi.number().required().min(150)


});
return valSchema.validate(obj)
}
module.exports=mongoose.model('book',bookSchema)