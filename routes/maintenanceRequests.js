// maintenance endpoints used by DPW Maintenance

const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const dt = require("node-json-transform").DataTransform
const models = require('./models/maintenanceRequests')
const checkToken = require('./../token')

global.Headers = fetch.Headers

// return all maintenance requests
router.get('/allRequests',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      fetch("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/cgTasksClass?filter=(([RequestIssue] is not equal to \"\"))&limit=10000&offset=0", {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Basic ' + process.env.CART
          })
        })
        .then(res => res.json())
        .then(data => {
          res.status(200).send(dt(data, models.allRequests).transform())
        })
    } else res.status(403).end()
  }
)

// return all issue types
router.get('/allIssues',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      fetch("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestIssuesClass?fields=Oid,AppliesTocgFacilitiesField,IssueField,InternalRequestCategoryField,InactiveField&filter=(([AppliesTocgFacilities] is equal to true AND [Inactive] is equal to false))", {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Basic ' + process.env.CART
          })
        })
        .then(res => res.json())
        .then(data => {
          res.status(200).send(dt(data, models.issues).transform())
        })
    } else res.status(403).end()
  }
)

// create a new maintenance request
router.post('/newRequest',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      fetch("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgTasksClass", {
          method: 'POST',
          headers: new Headers({
            'Authorization': 'Basic ' + process.env.CART,
            'Accept': 'application/json',
            'Content-Type': 'application/json;odata=verbose'
          }),
          body: JSON.stringify(req.body)
        })
        .then(res => {
          if (res.status == 200) {
            return res.status(201).send({
              success: 'true'
            })
          } else {
            return res.status(201).send({
              success: 'false'
            })
          }
        })
    } else res.status(403).end()
  }
)

module.exports = router