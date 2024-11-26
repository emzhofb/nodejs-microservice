const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
  res.json({ message: 'product list data' })
})

module.exports = router
