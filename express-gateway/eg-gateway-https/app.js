const express = require('express')
const https = require('https')
const fs = require('fs')

const app = express()
const port = 3000

// should be same as /config/gateway.config.yml
app.get('/', (req, res) => {
  res.send('hello, express gateway with tls/ssl!')
})

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
}

const server = https.createServer(options, app)

server.listen(port, () => {
  console.log(`server listening at https://localhost:${port}`)
})
