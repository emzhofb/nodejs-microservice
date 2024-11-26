const express = require('express')
const http = require('http')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')
const httpProxy = require('http-proxy')

const app = express()
const port = 3000

// rate limit middleware
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'rate limit exceeded, please try again later.'
})

app.use(limiter)

// logging middleware
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('welcome to the gateway.')
})

// proxy to handle load balancing
const proxy = httpProxy.createProxyServer()

// load balancing setuo
const services = [
  { target: 'http://localhost:3001' },
  { target: 'http://localhost:3002' },
  { target: 'http://localhost:3003' },
]

// load balancing middleware
app.use('/service*', (req, res) => {
  const { url } = req
  const selectedService = services[Math.floor(Math.random() * services.length)]
  proxy.web(req, res, { target: selectedService.target + url })
})

// list of instances for backend services
http.createServer((req, res) => {
  res.end('service 1 response')
}).listen(3001)

http.createServer((req, res) => {
  res.end('service 2 response')
}).listen(3002)

http.createServer((req, res) => {
  res.end('service 3 response')
}).listen(3003)

// start the gateway
const server = http.createServer(app)
server.listen(port, () => {
  console.log(`edge gateway is running on http://localhost:${port}`)
})
