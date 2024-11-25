const express = require('express')
const app = express()
const port = 4000

app.get('/class', (req, res) => {
  res.send(["programming 1", "programming 2", "programming 3" ])
})

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})
