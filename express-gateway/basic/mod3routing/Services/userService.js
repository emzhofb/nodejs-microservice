const express = require('express')
const router = express.Router()

router.get('/profile', (req, res) => {
  res.json({ message: 'user profile data' })
})

module.exports = router
