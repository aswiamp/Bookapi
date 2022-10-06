const express = require('express')

const router = express.Router()
const {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
  getBook,
} = require('../controllers/books')
require('../middleware/validator-joi')

router.route('/').post(createBook).get(getAllBooks)

router.route('/:id').get(getBook).delete(deleteBook).patch(updateBook)

//router.route('/uploads').post(uploadBookImage);

module.exports = router
