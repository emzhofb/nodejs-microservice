// multi thread

// import cluster to enable creating child process
const cluster = require('cluster')
// import http to create http server
const http = require('http')
// determine the number of cpu cores
const numberOfCPUs = require('os').cpus().length;

// checking if current process is master process
if (cluster.isMaster) {
  // output to indicate master process is running
  console.log(`master ${process.pid} is running`)

  // forking the worker based on the number of cpus
  for (let i = 0; i < numberOfCPUs; i++) {
    cluster.fork()
  }

  // event listener for the exit event, triggered when process is exited
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  // code for worker process

  // create an http server
  const server = http.createServer((req, res) => {
    // setting response header
    res.writeHead(200, { 'content-type': 'text/plain' })
  
    // send simple response
    res.end('clustered app\n')
  })

  // specify the port for server listening on
  const port = 3000

  // make server listen on the port and log the message once it runs
  server.listen(port, () => {
    console.log(`clustered server (worker ${process.pid}) listening on port ${port}`)
  })
}
