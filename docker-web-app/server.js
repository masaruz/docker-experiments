const express = require('express')
const os = require('os')
// Constants
const PORT = 8080

// App
const app = express()
app.get('/', function (req, res) {
  const interfaces = os.networkInterfaces()
  const addresses = [];
  for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
      const address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
          addresses.push(address.address)
        }
    }
  }
  res.send('Hello from ' + addresses)
})

app.listen(PORT)
console.log('Running on http://localhost:' + PORT)