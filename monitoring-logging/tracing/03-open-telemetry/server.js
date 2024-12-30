import http from 'http'
import { trace, metrics } from '@opentelemetry/api'
import express from 'express'
import morgan from 'morgan'
import winston from 'winston'

function makeRequest (url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let data = ''
      response.on('data', (chunk) => {
        data += chunk
      })
      response.on('end', () => {
        resolve(data)
      })
    })
  })
}

export default function getApp (serverName) {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.prettyPrint(),
    defaultMeta: { service: serverName },
    transports: [
      new winston.transports.Console()
    ]
  })

  const app = express()
  app.use(morgan('combined'))
  app.use((req, res, next) => {
    logger.info(req.headers)
    next()
  })

  const tracer = trace.getTracer(serverName)
  const meter = metrics.getMeter(serverName)

  return { app, tracer, meter, makeRequest, logger }
}
