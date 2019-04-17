// inventory endpoint used for PGH Supply

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const models = require("../models/pghSupply");
const dt = require("node-json-transform").DataTransform;
const request = require("request");
const fs = require("fs");

// return all items in materials class
// currently, just items for Public Safety - Fire
// expand filter as necessary
router.get("/allItems", (req, res) => {
  fetch(
    'https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/cgMaterialsClass?filter=((([MaterialType] is equal to "Warehouse") OR ([MaterialType] is equal to "Public Safety - Fire")) AND ([PublicSafetyCategories] is not equal to ""))&fields=Oid,DescriptionField,PublicSafetyCategoriesField,UnitField,MaterialTypeField,PrimaryAttachmentField&limit=10000&offset=0',
    {
      method: "get",
      headers: new Headers({
        Authorization: "Basic " + process.env.CART
      })
    }
  )
    .then(res => res.json())
    .then(data =>
      res.status(200).send(dt(data, models.inventoryItems).transform())
    )
    .catch(err => res.status(500).send(err));
});

router.get("/itemImage", (req, res) => {
  const options = {
    encoding: null,
    url:
      "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/attachments/primary/cgMaterialsClass/" +
      req.query.oid,
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Basic " + process.env.CART,
      "Content-type": "image/*"
    }
  };
  request(options, (e, r, body) => {}).pipe(res);
});

module.exports = router;
