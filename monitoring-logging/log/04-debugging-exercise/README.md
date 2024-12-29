# Debugging Example
This example generates some logs, simulating GloboTicket's microservices logs. It uses Winston to log to a file, and Filebeat to send the logs to Logstash.

The logs simulate multiple users using the platform, and multiple microservices interacting with each other.

## Running the example

**NOTE**: You need to have the Filebeat agent running in docker. See the instructions in the [elk-stack](../elk-stack/README.md) section to run an ELK stack using Docker Compose.

```bash
npm install
npm start
```

This will output some text to the console, indicating user IDs with problems. This is to simulate a real-world scenario where you have to debug an issue in the logs.

Because the process is random, you may not see any output indicating a problem. If you don't see any output, try running the example again.

## Querying the logs
See [the Module 3 README](../README.md) for instructions on querying the logs.

In this example you should use the Kibana Discover UI to filter the logs. Open [http://localhost:5601/app/discover](http://localhost:5601/app/discover) in your browser.

Configure the UI to show the relevant columns and filter the logs to find the what was the problem with these user IDs.
