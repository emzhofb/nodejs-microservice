# Running Prometheus, Alertmanager and Grafana with Docker Compose
To run Prometheus, Alertmanager and Grafana with Docker Compose, run the following command from the folder where the [`docker-compose.yml`](./docker-compose.yml) file is located:

```bash
docker compose up -d --build
```

The `-d` flag runs the containers in the background. The `--build` flag rebuilds the images before starting the containers.

This will start Prometheus, Grafana and Alertmanager. You can access them at:
- Grafana: [http://localhost:3000](http://localhost:3000)
- Prometheus: [http://localhost:9090](http://localhost:9090)
- Alertmanager: [http://localhost:9093](http://localhost:9093)

Log in to Grafana with the following credentials:
- Username: `admin`
- Password: `admin`

To stop the Docker Compose stack, run the following command:

```bash
docker compose down --volumes
```

The `--volumes` flag removes the volumes associated with the containers.

## Prometheus

Prometheus configuration is defined in the [`prometheus.yml`](./prometheus.yml) file.

## Alertmanager

Alertmanager configuration is defined in the [`alertmanager.yml`](./alertmanager.yml) file.

## Grafana

Grafana configuration is defined in the [`datasource.yml`](./datasource.yml) file.

There is a pre-configured dashboard for the metrics of this example in the [`dashboard.json`](./dashboard/dashboard.json) file.

## Webhook

There's also a simple webhook server that listens for alerts from Alertmanager. This uses the
[Coveros Webhook Tester Docker Image](https://hub.docker.com/r/coveros/webhook-tester), which exposes a simple HTTP server that logs incoming requests.

To access the logs from the webhook server, run the following command:

```bash
docker compose logs -f webhook
```
