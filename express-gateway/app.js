const express = require('express')
const app = express()
const port = 3000

// should be same as /express-gateway/config/gateway.config.yml
app.get('/api', (req, res) => {
  res.send('hello, this is your simple node.js app')
})

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})
