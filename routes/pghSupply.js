// inventory endpoint used for PGH Supply

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const models = require("../models/pghSupply");
const dt = require("node-json-transform").DataTransform;

// return all items in materials class
// currently, just items for Public Safety - Fire
// expand filter as necessary
router.get("/allItems", (req, res) => {
  fetch(
    'https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/cgMaterialsClass?filter=(([MaterialType] is equal to "Public Safety - Fire"))&fields=Oid,DescriptionField,PublicSafetyCategoriesField,UnitField',
    {
      method: "get",
      headers: new Headers({
        Authorization: "Basic " + process.env.CART
      })
    }
  )
    .then(res => res.json())
    .then(data => res.status(200).send(dt(data, models.pbfItems).transform()))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
