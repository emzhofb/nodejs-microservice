import express from 'express'
import morgan from 'morgan'
import { register, collectDefaultMetrics, Counter, Histogram } from 'prom-client'

const PORT = process.env.PORT || 8000
const app = express()
app.use(morgan('combined'))

/* Collect some default Node.js metrics */
collectDefaultMetrics()

/* Define a counter to track the number of events processed */
const eventsProcessedCounter = new Counter({
  name: 'globoticket_events_processed_total',
  help: 'Total number of events processed by the Events service'
})
register.registerMetric(eventsProcessedCounter)

/* Define a histogram to track the duration of event processing */
const eventProcessingDuration = new Histogram({
  name: 'globoticket_event_processing_duration_seconds',
  help: 'Distribution of event processing times in seconds',
  buckets: [0.01, 0.05, 0.1, 0.5, 1]
})
register.registerMetric(eventProcessingDuration)

/* Expose the metrics at the /metrics endpoint */
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType)
    const metrics = await register.metrics()
    res.send(metrics)
  } catch (error) {
    console.log('Error fetching metrics:', error)
    res.status(500).send('Error fetching metrics')
  }
})

/* Simulate processing an event */
app.get('/process-event', async (req, res) => {
  await processEvent()
  res.send('Event processed')
})

/* Helper function to simulate a delay */
async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/* Decorator to track the duration of event processing */
function metricsDecorator (f) {
  return async function (req, res) {
    const end = eventProcessingDuration.startTimer()
    try {
      const result = await f(req, res)
      eventsProcessedCounter.inc()
      return result
    } finally {
      end()
    }
  }
}

/* Function to simulate processing an event */
const processEvent = metricsDecorator(async () => {
  await sleep(Math.random() * 1000)
  console.log('Processed event')
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})
