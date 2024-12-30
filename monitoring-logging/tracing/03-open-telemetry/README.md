# Open Telemetry Example
This example generates some traces and metrics and sends them to a Tracing server (either a console, Jaeger or Zipkin) and a Metrics server (Prometheus).

This example uses the [Open Telemetry](https://github.com/open-telemetry/opentelemetry-js) client library for Node.js to instrument the application and send traces and metrics to a Tracing server and a Metrics server.

You can read more about [Open Telemetry](https://opentelemetry.io/) in their official website.

## Running the example

**NOTE**: You need to have Jaeger, Zipkin and Prometheus running in docker. See the instructions in the [jaeger-zipkin](../jaeger-zipkin/README.md) section to run them using Docker Compose.

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

This will generate some traces that will be sent to the Exporter (either a console, Jaeger or Zipkin) and some metrics that will be exposed in the `/metrics` endpoint on ports `9464` and `9465`.

### Changing the exporter

By default the exporter is set to `console`. You can change it to `jaeger` or `zipkin` by setting the `EXPORTER` environment variable. For example, to use the Jaeger exporter, run the following commands in two different terminals:

```bash
npm run start:A:jaeger
npm run start:B:jaeger
```

or to use the Zipkin exporter, run the following commands in two different terminals:

```bash
npm run start:A:zipkin
npm run start:B:zipkin
```

## Visualizing the traces

Depending on the exporter you choose, you can visualize the traces in the Jaeger or Zipkin UIs at [http://localhost:16686](http://localhost:16686) and [http://localhost:9411](http://localhost:9411) respectively.

## Visualizing the metrics

You can visualize the metrics in Prometheus at [http://localhost:9094](http://localhost:9094) and [http://localhost:9095](http://localhost:9095) for the two instances of the service. You can also access the metrics in the Prometheus UI at [http://localhost:9090](http://localhost:9090).

[Prometheus with URL query](http://localhost:9090/graph?g0.expr=service_A_event_count_total&g0.tab=1&g0.display_mode=lines&g0.show_exemplars=0&g0.range_input=1h)