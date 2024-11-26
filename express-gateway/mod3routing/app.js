const express = require('express')
const app = express()
const port = 3000

const userService = require('./Services/userService')
const productService = require('./Services/productService')
const orderService = require('./Services/orderService')

app.use('/users', userService)
app.use('/products', productService)
app.use('/orders', orderService)

app.listen(port, () => {
  console.log(`api gateway listening at http://localhost:${port}`)
})