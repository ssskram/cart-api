// inventory endpoint used for PGH Supply

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const models = require("../models/pghWorks");
const dt = require("node-json-transform").DataTransform;

// return all items in activity class, which is a library in Cartegraph
router.get("/activity", (req, res) => {
  fetch(
    "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/PGHWorksActivitiesClass?limit=10000&offset=0",
    {
      method: "get",
      headers: new Headers({
        Authorization: "Basic " + process.env.CART
      })
    }
  )
    .then(res => res.json())
    .then(data => res.status(200).send(dt(data, models.activity).transform()))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
