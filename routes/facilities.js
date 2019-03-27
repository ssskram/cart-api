// facility endpoints used by DPW Maintenance

const express = require("express");
const router = express.Router();
const dt = require("node-json-transform").DataTransform;
const fetch = require("node-fetch");
const models = require("../models/facilities");

// return all facilities
router.get("/allFacilities", (req, res) => {
  fetch(
    "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgFacilitiesClass?fields=Oid,CgShape,IDField,NeighborhoodField,InactiveField&filter=(([Inactive] is equal to false))",
    {
      method: "get",
      headers: new Headers({
        Authorization: "Basic " + process.env.CART
      })
    }
  )
    .then(res => res.json())
    .then(data => {
      res.status(200).send(dt(data, models.allFacilities).transform());
    });
});

module.exports = router;
