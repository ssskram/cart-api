const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const checkToken = require('./auth')

global.Headers = fetch.Headers

// return all facilities
router.get('/allFacilities',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      fetch("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgFacilitiesClass?fields=Oid,CgShape,IDField,NeighborhoodField,InactiveField&filter=(([Inactive] is equal to false))", {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Basic ' + process.env.CART
          })
        })
        .then(res => res.json())
        .then(data => {
          res.status(200).send(data)
        })
    } else res.status(403).end()
  }
)

module.exports = router