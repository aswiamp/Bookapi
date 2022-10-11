
const jwt = require('jsonwebtoken')
const { CustomAPIError } = require('../errors/custom-errors')
const {UnauthenticatedError} = require('../errors/unauthenticated')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new  UnauthenticatedError('Authentication invalid',401)
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name,role:payload.role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid',401)
  }
}

module.exports = auth