const mongoose =  require('mongoose');
//const User = require("./user");
//const Book = require('./book');

//creating item schema
const purchaseSchema = new mongoose.Schema({
    quantity :{
        type : Number,
    },
    totalPrice :{
        type : Number
    },
    userId : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    bookId : {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
    }
});

//Creating Model
//export
module.exports = mongoose.model('Purchase',purchaseSchema);