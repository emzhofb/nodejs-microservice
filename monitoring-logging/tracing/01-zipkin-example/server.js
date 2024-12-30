import { Tracer, BatchRecorder, jsonEncoder } from 'zipkin'
import { HttpLogger } from 'zipkin-transport-http'
import { expressMiddleware } from 'zipkin-instrumentation-express'
import CLSContext from 'zipkin-context-cls'
import wrapFetch from 'zipkin-instrumentation-fetch'
import express from 'express'
import morgan from 'morgan'

const ZIPKIN_URL = process.env.ZIPKIN_URL ?? 'http://localhost:9411'

const recorder = new BatchRecorder({
  logger: new HttpLogger({
    endpoint: `${ZIPKIN_URL}/api/v2/spans`,
    jsonEncoder: jsonEncoder.JSON_V2
  })
})

export default function getApp (localServiceName) {
  const ctxImpl = new CLSContext(localServiceName)
  const tracer = new Tracer({ ctxImpl, recorder, localServiceName })

  const zipkinFetch = wrapFetch(fetch, { tracer, remoteServiceName: '' })

  const app = express()
  app.use(morgan('combined'))
  app.use((req, res, next) => {
    console.log(req.headers)
    next()
  })

  app.use(expressMiddleware({ tracer }))

  function logToTrace (message) {
    ctxImpl.scoped(() => {
      tracer.recordMessage(message)
    })
  }

  async function callWithTraceFromRequest (req, name, fn) {
    return await tracer.letId(req._trace_id, async () => {
      return await tracer.local(name, async () => {
        return await fn()
      })
    })
  }

  return { app, zipkinFetch, tracer, logToTrace, callWithTraceFromRequest }
}
