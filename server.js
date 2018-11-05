var express = require('express')
const bearerToken = require('express-bearer-token')
var facilities = require('./facilities')
var maintenanceRequests = require('./maintenanceRequests')

require('dotenv').config()

var app = express()
app.set('port', process.env.PORT || 3000)

// logging
app.use(require('morgan')('combined'))

// bearer token
app.use(bearerToken())
const checkToken = (token) => {
  if (token == process.env.BEARER) return true
  else return false
}

/*
Facilities
*/

// return all facilities
app.get('/allFacilities',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      res.status(200).send(facilities.allFacilities.get())
    } else res.status(403).end()
  }
)

/*
Maintenance requests
*/

// return all maintenance requests
app.get('/allRequests',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      res.status(200).send(maintenanceRequests.allRequests.get())
    } else res.status(403).end()
  }
)

// return all issue types
app.get('/allIssues',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      res.status(200).send(maintenanceRequests.allIssues.get())
    } else res.status(403).end()
  }
)

// create a new maintenance request
app.post('/newRequest',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      res.status(200).send(maintenanceRequests.newRequest.post())
    } else res.status(403).end()
  }
)


// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
})