const express = require('express')
const app = express()
const port = 3000
let isDisableKeepAlive = false
app.use(function(req, res, next) {
  if (isDisableKeepAlive) {
    res.set('Connection', 'close')
  }
  next()
})
app.get('/', function(req, res) { 
  res.send('Hello World!')
})
app.listen(port, function() {
  process.send('ready')
  console.log(`application is listening on port ${port}...`)
})
process.on('SIGINT', function () {
  isDisableKeepAlive = true
  app.close(function () {
  console.log('server closed')
  process.exit(0)
  })
})