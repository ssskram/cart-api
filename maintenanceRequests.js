const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const checkToken = require('./auth')

global.Headers = fetch.Headers

// return all maintenance requests
router.get('/allRequests',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      fetch("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestsClass?fields=Oid,BuildingNameField,LocationDescriptionField,DescriptionField,EntryDateField,StatusField,IssueField&filter=([EnteredBy] is equal to \"APIAdmin\")", {
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

// return all issue types
router.get('/allIssues',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
      fetch("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestIssuesClass?fields=Oid,AppliesTocgFacilitiesField,IssueField,InternalRequestCategoryField,InactiveField&filter=(([AppliesTocgFacilities] is equal to true))", {
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

// create a new maintenance request
router.post('/newRequest',
  function (req, res) {
    const valid = (checkToken(req.token))
    if (valid == true) {
    } else res.status(403).end()
  }
)

module.exports = router