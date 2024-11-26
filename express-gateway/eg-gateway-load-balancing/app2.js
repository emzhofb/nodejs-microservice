const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res) => {
  res.send('hello from app 2!')
})

app.listen(port, () => {
  console.log(`app 2 listening at http://localhost:${port}`)
})
