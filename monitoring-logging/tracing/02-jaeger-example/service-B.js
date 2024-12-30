import getApp from './server.js'

const PORT = process.env.PORT || 8001
const { app, tracer } = getApp('jaeger-example-B')

app.get('/b', async (req, res) => {
  // perform multiple operations in parallel to see traces
  const promises = []
  for (let i = 0; i < 3; i++) {
    promises.push(new Promise((resolve) => {
      const childSpan = tracer.startSpan(`call-database-${i}`, { childOf: req.span })
      setImmediate(() => {
        callDatabase()
        resolve()
        childSpan.finish()
      })
    }))
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
