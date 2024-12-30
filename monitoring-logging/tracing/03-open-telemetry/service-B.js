import getApp from './server.js'

const PORT = process.env.PORT || 8001

const { app, tracer, meter } = getApp('open-telemetry-B')

app.get('/b', async (req, res) => {
  // perform multiple operations in parallel to see traces
  const promises = []
  for (let i = 0; i < 3; i++) {
    promises.push(new Promise((resolve) => {
      const childSpan = tracer.startSpan(`call-database-${i}`)
      setImmediate(() => {
        callDatabase()
        resolve()
        childSpan.end()
      })
    }))
  }
  await Promise.all(promises)
  res.send('Hello from B')
})

const databaseCounter = meter.createCounter('service-B.db.client.call.count', {
  description: 'Number of database calls'
})

function callDatabase () {
  databaseCounter.add(1)
  const iterations = Math.floor(100_000_000 * Math.random())
  for (let i = 0; i < iterations; i++) {
    // do nothing
  }
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
