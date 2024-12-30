import getApp from './server.js'

const PORT = process.env.PORT || 8001
const { app, callWithTraceFromRequest } = getApp('zipkin-example-B')

app.get('/b', async (req, res) => {
  // perform multiple operations in parallel to see traces
  const promises = []
  for (let i = 0; i < 3; i++) {
    promises.push(
      callWithTraceFromRequest(req, `call-database-${i}`, callDatabase)
    )
  }
  await Promise.all(promises)
  res.send('Hello from B')
})

function callDatabase () {
  const iterations = Math.floor(100_000_000 * Math.random())
  for (let i = 0; i < iterations; i++) {
    // do nothing
  }
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
