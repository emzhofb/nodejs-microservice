# Jaeger Example
This example generates some traces and sends them to a Jaeger server.

This example uses the [Jaeger client](https://github.com/jaegertracing/jaeger-client-node) library for Node.js to instrument the application and send traces to a Jaeger server. This library is deprecated in favor of the [OpenTelemetry](https://opentelemetry.io/) project, but it's still useful to understand how distributed tracing works. You can find an example using OpenTelemetry in [`03-open-telemetry`](../03-open-telemetry/README.md).

## Running the example

**NOTE**: You need to have Jaeger running in docker. See the instructions in the [jaeger-zipkin](../jaeger-zipkin/README.md) section to run them using Docker Compose.

For this example we need to run two services, so we can simulate a request between microservices. To do that, run the following commands in one terminal:
```bash
npm install
npm run start:A
```

and then in another terminal run:
```bash
npm run start:B
```

This will start one instance of each service: service A running on port 8000 and service B running on port 8001.
Service B exposes a `/b` endpoint that simulates a microservice doing some work, and service A exposes an `/a` endpoint that simulates a request to another microservice.

You can generate traffic to the `/a` endpoint by running the following command in another terminal:

```bash
curl http://localhost:8000/a
```

This will generate some traces that will be sent to the Jaeger server.

## Visualizing the traces

You can visualize the traces in the Jaeger UI at [http://localhost:16686](http://localhost:16686).