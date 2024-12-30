import jaegerClient from 'jaeger-client'

const { JAEGER_AGENT_HOST, JAEGER_AGENT_PORT } = process.env

const config = {
  sampler: {
    type: 'const',
    param: 1
  },
  reporter: {
    logSpans: true,
    agentHost: JAEGER_AGENT_HOST ?? 'localhost',
    agentPort: parseInt(JAEGER_AGENT_PORT ?? '6832')
  }
}

function createJaegerTracer (serviceName, logger) {
  const options = {
    logger: {
      info: (message) => {
        console.info(`JAEGER: INFO: ${message}`)
      },
      error: (message) => {
        console.error(`JAEGER: ERROR: ${message}`)
      }
    }
  }

  return jaegerClient.initTracer({ ...config, serviceName }, options)
}

export default createJaegerTracer
