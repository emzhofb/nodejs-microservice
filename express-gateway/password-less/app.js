const SECRET = 'secretkey1234$'
const ngrok_url = 'https://0ef7-182-2-42-143.ngrok-free.app'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/send_magic_link', function (req, res) {
  // simulate database read
  const sub = 123456

  const token = jwt.sign({
    'iss': 'magic-link-chrome-ext',
    'exp': Math.floor(Date.now() / 1000) + (5 * 60),
    'sub': sub,
    'nonce': Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  }, SECRET)

  resp = `<a href="${ngrok_url}/authenticate_user?token=${token}">Click me</a>`

  res.send(resp)
  res.status(200).end()
})

app.get('/authenticate_user', function (req, res) {
  if (req.query.token) {
    const token = req.query.token

    try {
      let decode_token = jwt.verify(token, SECRET)
      // simulate db communication
      const session_id = '123abc'
      const user_info = {
        sub: decode_token.sub,
        name: 'User'
      }

      res.cookie('sub', user_info.sub)
      res.cookie('sessionid', session_id)

      res.redirect(ngrok_url + '/welcome')
    } catch (error) {
      throw new Error('not authorized')
    }
  } else {
    throw new Error('not authorized')
  }
})

app.get('/welcome', function (req, res) {
  res.status(200).send(
    `<h1>Welcome</h1>
    <br>
    <h3>You are now logged into the *APP*</h3>`
  )
})

app.use((req, res, next) => {
  const err = new Error('route not found')
  err.status = 404

  throw err
})

app.use((err, req, res, next) => {
  res.clearCookie('sub')
  res.clearCookie('sessionid')
  res.status(err.status || 400).send(err.message || 'failed')
})

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${server.address().port}`)
})
