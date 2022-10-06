const express = require('express')
const router = express.Router()
const validationMiddleware=require("../middleware/validator-joi")
const {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
  getBook,
} = require('../controllers/books')
//require('../middleware/validator-joi')

router.route('/').post(validationMiddleware,createBook).get(getAllBooks)

router.route('/:id').get(getBook).delete(deleteBook).patch(updateBook)

//router.route('/uploads').post(uploadBookImage);

module.exports = router
