import express from 'express'
import logger from './logger.js'
import morganMiddleware from './morgan.middleware.js'

const app = express()
app.use(morganMiddleware)

app.get('/', (req, res) => {
  logger.debug('hello world routes was called')
  res.send('hello world!')
})

app.get('/error', (req, res) => {
  throw new Error('error route was called')
})

app.use((err, req, res, next) => {
  logger.error(
    err.message,
    {
      error: err,
      stackTrace: err.stack,
    },
  ),
  res.status(500).send('something went wrong')
})

app.listen(3000, () => {
  logger.info('server listening at http://localhost:3000')
})
