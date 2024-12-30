import opentelemetry from '@opentelemetry/api'

import getApp from './server.js'

const PORT = process.env.PORT || 8000
const CLIENT_PORT = process.env.CLIENT_PORT || 8001

const { app, tracer, meter, makeRequest } = getApp('open-telemetry-A')

app.get('/a', async (req, res) => {
  const response = await makeRequest(`http://localhost:${CLIENT_PORT}/b`)
  opentelemetry.trace.getActiveSpan().addEvent('Response received', { message: 'Received response from B', response })

  const processOutput = async (span) => {
    const output = doSomething()
    span.addEvent('Output processed', { message: `Processed output: ${output}` })
    span.end()
  }

  await tracer.startActiveSpan('process-output-1', processOutput)
  await tracer.startActiveSpan('process-output-2', processOutput)

  res.send('Hello from A')
})

const eventsCounter = meter.createCounter('service-A.event.count', {
  description: 'Number of events processed'
})

const histogram = meter.createHistogram('service-A.event.duration', {
  description: 'The duration of event processing',
  boundaries: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
})

function doSomething () {
  eventsCounter.add(1)
  const startTime = new Date().getTime()
  const iterations = Math.floor(100_000_000 * Math.random())
  for (let i = 0; i < iterations; i++) {
    // do nothing
  }
  histogram.record(new Date().getTime() - startTime)
  return iterations
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
