const express = require('express')
const app = express()
const port = 3000

app.get('/user', (req, res) => {
  res.send(["student1", "student2", "student3", "student4", "student5" ])
})

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})
