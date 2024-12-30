# Running Jaeger and Zipkin with Docker Compose
To run Jaeger and Zipkin with Docker Compose, run the following command from the folder where the [`docker-compose.yml`](./docker-compose.yml) file is located:

```bash
docker compose up -d --build
```

The `-d` flag runs the containers in the background. The `--build` flag rebuilds the images before starting the containers.

This will start Prometheus, Grafana and Alertmanager. You can access them at:
- Jaeger: [http://localhost:16686](http://localhost:16686)
- Zipkin: [http://localhost:9411](http://localhost:9411)

For the Open Telemetry example, we also use Prometheus, so you can access it at:
- Prometheus: [http://localhost:9090](http://localhost:9090)

To stop the Docker Compose stack, run the following command:

```bash
docker compose down --volumes
```

The `--volumes` flag removes the volumes associated with the containers.