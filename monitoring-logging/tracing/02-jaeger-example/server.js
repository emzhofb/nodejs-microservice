import { jaegerMiddleware } from './jaegerMiddleware.js'
import createJaegerTracer from './jaegerTracer.js'
import { Span, FORMAT_HTTP_HEADERS } from 'opentracing'
import express from 'express'
import morgan from 'morgan'

export default function getApp (serverName) {
  const tracer = createJaegerTracer(serverName)

  const jaegerFetch = async (req, url) => {
    const jaegerHeaders = {}
    tracer.inject(req.span.context() ?? new Span(), FORMAT_HTTP_HEADERS, jaegerHeaders)
    return await fetch(url, { headers: jaegerHeaders })
  }

  const app = express()
  app.use(morgan('combined'))
  app.use((req, res, next) => {
    console.log(req.headers)
    next()
  })

  app.use(jaegerMiddleware(tracer))

  return { app, jaegerFetch, tracer }
}
