var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cors = require("cors");
const mongoose = require("mongoose");
//var connection = new require("./kafka/Connection");
const frontendURL = "http://localhost:3000";
const URI =
  "mongodb+srv://hrAdmin:hrAdmin@cluster0.5qymo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};
const mongoConnection = async () => {
  await mongoose.connect(URI, options, (err, res) => {
    if (err) {
      console.log("MongoDB Connection Failed:", err);
    } else {
      console.log("MongoDB connected");
    }
  });
};

mongoConnection();
//use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "HR_Datis_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", frontendURL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const Login = require("./routes/Login");
const Emp = require("./routes/empDetails");

app.use("/user", Login);
app.use("/empDetails", Emp);

//start your server on port 3001
app.listen(3001, () => console.log("Server Listening on port 3001"));
