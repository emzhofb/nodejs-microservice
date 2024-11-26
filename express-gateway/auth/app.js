const express = require('express')

const app = express()
const port = 3000

require('dotenv').config()

// session setup
const session = require('express-session')
const secret = process.env.SESSION_SECRET
const store = new session.MemoryStore()

// authentication middleware
const protect = (req, res, next) => {
  const { authenticated } = req.session
  if (!authenticated) {
    res.sendStatus(401)
  } else {
    next()
  }
}

// middleware config
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
    store,
  })
)

// routes
app.get('/', (req, res) => {
  const { name = 'user' } = req.query
  res.send(`hello from root service ${name}!`)
})

// route to handle user authentication
app.get('/login', (req, res) => {
  const { authenticated } = req.session

  if (!authenticated) {
    req.session.authenticated = true
    res.send('successfully authenticated')
  } else {
    res.send('already authenticated')
  }
})

// route to logout
app.get('/logout', protect, (req, res) => {
  req.session.destroy(() => {
    res.send('successfully logged out')
  })
})

// protected route
app.get('/protected', protect, (req, res) => {
  const { name = 'user' } = req.query
  res.send(`hello from the protected service ${name}!`)
})

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})
