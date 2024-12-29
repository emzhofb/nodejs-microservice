# Logstash Transport for Winston
This example shows how to use the [`winston-logstash`](https://github.com/jaakkos/winston-logstash) package to log to an Elasticsearch cluster via Logstash using winston with the logstash transport.

This sends the logs to logstash using TCP.

## Running the example

**NOTE**: You need to have a Logstash instance running to run this example. See the instructions in the [elk-stack](../elk-stack/README.md) section to run an ELK stack using Docker Compose.

```bash
npm install
npm start
```

See [the Module 3 README](../README.md) for instructions on querying the logs.