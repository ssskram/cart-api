// inventory endpoint used for PGH Supply

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const models = require("../models/pghSupply");
const dt = require("node-json-transform").DataTransform;
const request = require("request");
const fs = require("fs");

// return all items in materials class
router.get("/allItems", (req, res) => {
  fetch(
    'https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/cgMaterialsClass?filter=((([MaterialType] is equal to "Warehouse") OR ([MaterialType] is equal to "Public Safety - Fire")) AND ([PublicSafetyCategories] is not equal to "") AND ([Inactive] is equal to false))&fields=Oid,DescriptionField,PublicSafetyCategoriesField,UnitField,MaterialTypeField,PrimaryAttachmentField,IDField,InactiveField&limit=10000&offset=0',
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
    .catch(err => {
      console.log(27);
      console.log(err);
      res.status(500).send(err);
    });
});

// passed an oid, returns the primary attachment, which is an image
router.get("/itemImage", (req, res) => {
  try {
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
    request(options, (e, r, body) => {
      if (e) {
        console.log(50);
        console.log(e);
        console.log(r);
      }
      if (r && r.statusCode != 200) {
        console.log(54);
        console.log(r.statusCode);
      }
    }).pipe(res);
  } catch (err) {
    console.log(59);
    console.log(err);
  }
});

// delivery locations
router.get("/deliveryLocations", (req, res) => {
  fetch(
    "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/WarehouseDeliveryLocationsClass",
    {
      method: "get",
      headers: new Headers({
        Authorization: "Basic " + process.env.CART
      })
    }
  )
    .then(res => res.json())
    .then(data =>
      res.status(200).send(dt(data, models.deliveryLocations).transform())
    )
    .catch(err => {
      console.log(80);
      console.log(err);
      res.status(500).send(err);
    });
});
module.exports = router;
