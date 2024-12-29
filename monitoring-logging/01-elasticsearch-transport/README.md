# Elasticsearch Transport for Winston
This example shows how to use the [`winston-elasticsearch`](https://github.com/vanthome/winston-elasticsearch) package to log to an Elasticsearch cluster using winston with the elasticsearch transport.

This sends the logs directly to Elasticsearch, bypassing Logstash.

## Running the example

**NOTE**: You need to have an Elasticsearch cluster running to run this example. See the instructions in the [elk-stack](../elk-stack/README.md) section to run an ELK stack using Docker Compose.

```bash
npm install
npm start
```

See [the Module 3 README](../README.md) for instructions on querying the logs.
