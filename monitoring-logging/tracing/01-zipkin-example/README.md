# Zipkin Example
This example generates some traces and sends them to a Zipkin server.

This example uses the [Zipkin JS](https://github.com/openzipkin/zipkin-js) client library for Node.js to instrument the application and send traces to a Zipkin server.

## Running the example

**NOTE**: You need to have Zipkin running in docker. See the instructions in the [jaeger-zipkin](../jaeger-zipkin/README.md) section to run them using Docker Compose.

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

This will generate some traces that will be sent to the Zipkin server.

## Visualizing the traces

You can visualize the traces in the Zipkin UI at [http://localhost:9411](http://localhost:9411).