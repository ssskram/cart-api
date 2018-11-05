var express = require('express')
const bearerToken = require('express-bearer-token')

// import env variables
require('dotenv').config()

// start express
var app = express()
app.set('port', process.env.PORT || 3000)

// bearer token
app.use(bearerToken())

// logging
app.use(require('morgan')('combined'))

// routes
app.use("/facilities",require('./facilities'))
app.use("/maintenanceRequests",require('./maintenanceRequests'))

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})