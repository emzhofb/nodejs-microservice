const express = require('express')
const rateLimit = require('express-rate-limit')
const app = express()
const port = 3000

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 request per minute
})

// middleware for logging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`)
  next()
})

// rate limit only specific route
app.use('/limited', limiter)

// microservice route
app.get('/limited/service', (req, res) => {
  res.json({ message: 'this is a limited microservice route' })
})

app.listen(port, () => {
  console.log(`api gateway listening on port http://localhost:${port}`)
})
