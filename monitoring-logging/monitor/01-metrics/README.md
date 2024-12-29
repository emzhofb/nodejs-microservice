# Metrics Example
This example generates some metrics and exposes them into a `/metrics` endpoint, so it can be scraped by Prometheus and visualized in Grafana.

This example uses the [Prometheus client for Node.js](https://github.com/siimon/prom-client). You can see an [example](../../module-5/03-open-telemetry/README.md) of how to use OpenTelemetry in the next module.

## Running the example

**NOTE**: You need to have Prometheus and Grafana running in docker. See the instructions in the [prometheus-grafana](../prometheus-grafana/README.md) section to run them using Docker Compose.

```bash
npm install
npm start
```

This will log to the console whenever requests are made to the `/metrics` endpoint.

It also exposes a `/process-event` endpoint that simulates a request to a microservice. This endpoint will increase a counter and generate a random latency that will be stored into a histogram.

You can generate traffic to this endpoint by running the following command in another terminal:

```bash
while true; do curl http://localhost:8000/process-event; done
```

## Querying the metrics

You can query the metrics by accessing the `/metrics` endpoint:

```bash
curl http://localhost:3000/metrics
```

If Prometheus is configured to scrape this endpoint, you can also access the metrics in the Prometheus UI at [http://localhost:9090](http://localhost:9090).

## Visualizing the metrics

You can visualize the metrics in Grafana at [http://localhost:3000](http://localhost:3000). Log in with the following credentials:
- Username: `admin`
- Password: `admin`

You can import the dashboard json file from [`module-4/prometheus-grafana/dashboards/dashboard.json`](../prometheus-grafana/dashboards/dashboard.json) to visualize the metrics.

## Alerts

Alertmanager is configured to send alerts to a webhook server. You can access the logs from the webhook server by running the following command:

```bash
docker compose logs -f webhook
```

You can access the Alertmanager UI at [http://localhost:9093](http://localhost:9093).

Verify that the alerts are being sent to the webhook server by generating some traffic to the `/process-event` endpoint, and then stopping it. The alert should be trigger whenever the average number of requests per second is below 1.

