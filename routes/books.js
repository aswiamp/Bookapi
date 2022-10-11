const express = require('express')
const router = express.Router()
const {authorizePermissions}=require('../middleware/authorization')
const validationMiddleware=require("../middleware/validator-joi")
const {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
  getBook,
} = require('../controllers/books')
//require('../middleware/validator-joi')

router.route('/').post(authorizePermissions("admin"),validationMiddleware,createBook).get(getAllBooks)

router.route('/:id').get(getBook).delete(authorizePermissions("admin"),deleteBook).patch(authorizePermissions("admin"),updateBook)

//router.route('/uploads').post(uploadBookImage);

module.exports = router
