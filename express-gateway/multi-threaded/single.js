// single thread

// import http to create http server
const http = require('http')

// server with a callback to handle incoming requests
const server = http.createServer((req, res) => {
  // setting response header
  res.writeHead(200, { 'content-type': 'text/plain' })

  // send simple response
  res.end('single threaded app\n')
})

// specify the port for server listening on
const port = 3000

// make server listen on the port and log the message once it runs
server.listen(port, () => {
  console.log(`single threaded server listening on port ${port}`)
})
