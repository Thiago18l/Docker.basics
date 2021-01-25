const express = require('express');
const os = require('os');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

console.log(`Kubia server starting...`)

// App
const app = express();

app.get('/', (req, res) => {
  let ip = req.connection.remoteAddress
  res.status(200).send(`Received request from ${ip} and you've hit ${os.hostname()}`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);