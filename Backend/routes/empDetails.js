"use strict";
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/passport");
const Emp = require("../Models/EmpModel");

router.post("/add", checkAuth, (req, res) => {
  let empID = req.body.Eid;
  //let healthInsurance = 0.075 * req.body.Esal;
  //console.log("deduction401k", deduction401k);
  //console.log("healthInsurance", healthInsurance);

  // let emp = new Emp({
  //   Ename: req.body.Ename,
  //   Esal: req.body.Esal,
  //   deduction401k,
  //   healthInsurance,
  // });
  console.log(" details from frontend:", req.body);

  Emp.find({ Eid: empID }, (err, results) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    }
    if (results.length > 0) {
      console.log(`Employee ID already exists`);
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      let _401k = 0.1 * req.body.Esal;
      let hsa = 0.05 * req.body.Esal;
      let federalTax = 0.16 * req.body.Esal;
      let stateTax = 0.1 * req.body.Esal;
      let ssnMedicare = 0.075 * req.body.Esal;
      let totalTax = federalTax + stateTax + ssnMedicare;
      let paidAmt = req.body.Esal - _401k - hsa - totalTax;

      let empToCreate = Emp({
        Eid: req.body.Eid,
        Efname: req.body.Efname,
        Elname: req.body.Elname,
        Esal: req.body.Esal,
        deduction401k: _401k,
        healthInsurance: hsa,
        TotalTax: totalTax,
        PaidAmt: paidAmt,
      });

      console.log("empToCreate", empToCreate);
      empToCreate.save((error) => {
        if (error) {
          console.log(`Saving Error in create employee: ${error}`);
          res.writeHead(401, {
            "Content-Type": "text/plain",
          });
          res.end();
        }
        console.log("Successfully Created");
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end();
      });
    }
  });
});

router.get("/home", checkAuth, (req, res) => {
  console.log("Inside home");

  Emp.find({}, (error, result) => {
    console.log("result is:", result);
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
