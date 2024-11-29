const express = require('express')
const auth = require('./auth')
const roles = require('./roles')

const app = express()
const port = 3000

const adminRole = roles.admin
const token = auth.generateToken(adminRole)

console.log('generated token:', token)

app.use(express.json())

app.get('/public', (req, res) => {
  res.json({ message: 'public route' })
})

app.get('/admin', authenticateUser(roles.admin), (req, res) => {
  res.json({ message: 'admin route' })
})

function authenticateUser(requiredRole) {
  return (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'unauthorized' })
    
    const userRole = auth.verifyToken(token)
    if (!userRole || userRole != requiredRole) {
      return res.status(403).json({ message: 'forbidden' })
    }

    next()
  }
}

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})
