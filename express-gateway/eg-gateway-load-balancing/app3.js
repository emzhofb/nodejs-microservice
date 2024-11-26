const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.send('hello from app 3!')
})

app.listen(port, () => {
  console.log(`app 3 listening at http://localhost:${port}`)
})
