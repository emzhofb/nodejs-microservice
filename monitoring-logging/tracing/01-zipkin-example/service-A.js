import getApp from './server.js'

const PORT = process.env.PORT || 8000
const CLIENT_PORT = process.env.CLIENT_PORT || 8001
const { app, zipkinFetch, logToTrace, callWithTraceFromRequest } = getApp('zipkin-example-A')

app.get('/a', async (req, res) => {
  const response = await zipkinFetch(`http://localhost:${CLIENT_PORT}/b`)
  logToTrace(`Received response from B: ${await response.text()}`)

  const processOutput = () => {
    const output = doSomething()
    logToTrace(`Processed output: ${output}`)
  }
  await callWithTraceFromRequest(req, 'process-output', processOutput)
  await callWithTraceFromRequest(req, 'process-output', processOutput)
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
