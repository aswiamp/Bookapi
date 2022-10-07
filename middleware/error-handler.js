const { CustomAPIError } = require('../errors/custom-errors')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  
  if (err.name === 'ValidationError') {
    CustomAPIError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    CustomAPIError.statusCode = 400
  }
  
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware