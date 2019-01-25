// inventory endpoint used for PGH Supply

const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const models = require('../models/pghSupply')
const checkToken = require('./../token')
const dt = require("node-json-transform").DataTransform

global.Headers = fetch.Headers

// return all items in materials class
// currently, just items for Public Safety - Fire
// expand filter as necessary
router.get('/allItems',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      fetch('https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/cgMaterialsClass?filter=(([MaterialType] is equal to "Public Safety - Fire"))&fields=Oid,DescriptionField,PublicSafetyCategoriesField,UnitField', {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Basic ' + process.env.CART
          })
        })
        .then(res => res.json())
        .then(data => res.status(200).send(dt(data, models.pbfItems).transform()))
        .catch(err => res.status(500).send(err))
    } else res.status(403).end()
  }
)

module.exports = router