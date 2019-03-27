// maintenance endpoints used by DPW Maintenance

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dt = require("node-json-transform").DataTransform;
const models = require("../models/maintenanceRequests");
var multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.name);
  }
});
let upload = multer({
  storage: storage
});

// return all maintenance requests
router.get("/allRequests", (req, res) => {
  fetch(
    'https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/cgTasksClass?filter=(([RequestIssue] is not equal to ""))&limit=10000&offset=0',
    {
      method: "get",
      headers: new Headers({
        Authorization: "Basic " + process.env.CART
      })
    }
  )
    .then(res => res.json())
    .then(data => {
      res.status(200).send(dt(data, models.allRequests).transform());
    });
});

// return all issue types
router.get("/allIssues", (req, res) => {
  fetch(
    "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgRequestIssuesClass?fields=Oid,AppliesTocgFacilitiesField,IssueField,InternalRequestCategoryField,InactiveField&filter=(([AppliesTocgFacilities] is equal to true AND [Inactive] is equal to false))",
    {
      method: "get",
      headers: new Headers({
        Authorization: "Basic " + process.env.CART
      })
    }
  )
    .then(res => res.json())
    .then(data => {
      res.status(200).send(dt(data, models.issues).transform());
    });
});

// create a new maintenance request
router.post("/newRequest", (req, res) => {
  fetch(
    "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/Classes/cgTasksClass",
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Basic " + process.env.CART,
        "Content-Type": "application/json;odata=verbose"
      }),
      body: JSON.stringify(req.body)
    }
  )
    .then(response => response.json())
    .then(data => data.cgTasksClass[0])
    .then(newItem => newItem.Oid)
    .then(Oid =>
      res.status(200).send({
        Oid: Oid
      })
    )
    .catch(error => res.status(500).send(error));
});

// add an image attachment to maintenance request
router.post("/addImage", upload.single(), async (req, res) => {
  // req = file
  const response = await fetch(
    "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/attachments/cgTasksClass/" +
      req.query.oid +
      "/cgTasks_cgAttachmentsClass/?fileName=" +
      req.query.filename,
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Basic " + process.env.CART
      }),
      body: req
    }
  );
  const json = await response.json();
  res.status(200).send(json);
});

module.exports = router;
