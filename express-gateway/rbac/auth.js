const jwt = require('jsonwebtoken')
const roles = require('./roles')

const secretKey = 'your-secret-key'

function generateToken(role) {
  return jwt.sign({ role }, secretKey, { expiresIn: '1h' })
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded.role
  } catch (error) {
    return null
  }
}

module.exports = { generateToken, verifyToken, roles }
