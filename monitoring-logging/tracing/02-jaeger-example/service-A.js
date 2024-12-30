import getApp from './server.js'

const PORT = process.env.PORT || 8000
const CLIENT_PORT = process.env.CLIENT_PORT || 8001
const { app, jaegerFetch, tracer } = getApp('jaeger-example-A')

app.get('/a', async (req, res) => {
  const response = await jaegerFetch(req, `http://localhost:${CLIENT_PORT}/b`)
  req.span.log({ message: `Received response from B: ${await response.text()}` })

  let childSpan = tracer.startSpan('process-output', { childOf: req.span })
  let output = doSomething()
  childSpan.finish()

  req.span.log({ message: `Processed output: ${output}` })

  childSpan = tracer.startSpan('process-output', { childOf: req.span })
  output = doSomething()
  childSpan.finish()

  res.send('Hello from A')
})

function doSomething () {
  const iterations = Math.floor(100_000_000 * Math.random())
  for (let i = 0; i < iterations; i++) {
    // do nothing
  }
  return iterations
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
