const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// App
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
app.use(cookieParser())

app.use('/', require('./routes/index'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // render the error page
  res.status(err.status || err.errorCode || 500)
  res.send(err.message)
})

module.exports = app