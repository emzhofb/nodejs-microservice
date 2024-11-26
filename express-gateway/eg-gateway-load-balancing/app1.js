const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('hello from app 1!')
})

app.listen(port, () => {
  console.log(`app 1 listening at http://localhost:${port}`)
})
