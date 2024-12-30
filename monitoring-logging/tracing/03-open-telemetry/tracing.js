import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base'
import { Resource } from '@opentelemetry/resources'
import {
  SEMRESATTRS_SERVICE_NAME
} from '@opentelemetry/semantic-conventions'
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston'

const serviceName = process.env.SERVICE_NAME ?? 'open-telemetry-A'

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const consoleExporter = new ConsoleSpanExporter()
const zipkinExporter = new ZipkinExporter({
  url: 'http://localhost:9411/api/v2/spans',
  serviceName
})
const otlpExporter = new OTLPTraceExporter({
  // optional - default url is http://localhost:4318/v1/traces
  url: 'http://localhost:4318/v1/traces',
  // optional - collection of custom headers to be sent with each request, empty by default
  headers: {}
})

const exporters = {
  console: consoleExporter,
  zipkin: zipkinExporter,
  jaeger: otlpExporter
}

const traceExporter = exporters[process.env.EXPORTER] ?? consoleExporter

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: serviceName
  }),
  traceExporter,
  instrumentations: [
    new WinstonInstrumentation(),
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': {
        enabled: false
      }
    })
  ],
  metricReader: new PrometheusExporter({
    port: serviceName.endsWith('A') ? 9464 : 9465,
    host: '0.0.0.0'
  })
})

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0))
})
