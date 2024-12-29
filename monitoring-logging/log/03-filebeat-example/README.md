# Filebeat Example
This example shows how to use filebeat to send logs to logstash. In this case, we just use Winston to log to a file, and the filebeat agent reads the logs from the file and sends them to logstash.

## Running the example

**NOTE**: You need to have the Filebeat agent running in docker. See the instructions in the [elk-stack](../elk-stack/README.md) section to run an ELK stack using Docker Compose.

```bash
npm install
npm start
```

See [the Module 3 README](../README.md) for instructions on querying the logs.