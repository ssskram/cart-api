var express = require('express')
const bearerToken = require('express-bearer-token')
var items = require('./items')
var orders = require('./orders')

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
Items!
These endpoints call up Cartegraph
and return in-stock items for new orders
*/

// return all items
app.get('/allItems',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
        items.allItems.allItems()
        res.status(200).send('Got it!')
    } else res.status(403).end()
  }
)

// return pbf items
app.get('/pbfItems',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {

    } else res.status(403).end()
  }
)

// return dpw items
app.get('/dpwItems',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {

    } else res.status(403).end()
  }
)

/*
Orders!
These endpoints call up Mongo
and return existing orders and active carts
*/

// return existing orders
app.get('/allOrders',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {

    } else res.status(403).end()
  }
)

// return existing carts
app.get('/activeCarts',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {

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