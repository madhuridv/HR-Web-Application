"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../Utils/config");
const Users = require("../Models/UserModel");
const { auth } = require("../Utils/passport");
auth();

//Route to handle Post Request Call
router.post("/login", (req, res) => {
  Users.findOne(
    { username: req.body.username, password: req.body.password },
    (error, user) => {
      if (error) {
        res.status(500).end("Error Occured");
      }
      if (user) {
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).end("JWT " + token);
      } else {
        res.status(401).end("Invalid Credentials");
      }
    }
  );
});

module.exports = router;
