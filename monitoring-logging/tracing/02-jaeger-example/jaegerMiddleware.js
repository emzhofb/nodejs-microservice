import { FORMAT_HTTP_HEADERS, Tags } from 'opentracing'

export const jaegerMiddleware = (jaegerTracer) => (req, res, next) => {
  const extractedSpan = jaegerTracer.extract(FORMAT_HTTP_HEADERS, req.headers)
  const span = jaegerTracer.startSpan(req.path, {
    childOf: extractedSpan,
    tags: {
      [Tags.HTTP_METHOD]: req.method,
      [Tags.HTTP_URL]: req.url,
      [Tags.PEER_HOSTNAME]: req.hostname,
      [Tags.PEER_PORT]: req.socket.remotePort,
      [Tags.PEER_SERVICE]: req.hostname,
      [Tags.COMPONENT]: 'express'
    }
  })

  req.span = span

  res.on('finish', () => {
    if (res.statusCode >= 500) {
      span.setTag(Tags.ERROR, true)
      span.log({ 'error.message': res.statusMessage })
    }
    span.setTag(Tags.HTTP_STATUS_CODE, res.statusCode)
    span.finish()
  })

  next()
}
