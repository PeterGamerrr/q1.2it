const express = require("express");
const logger = require("morgan");
const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");
const app = express();

// log requests
//
app.use(logger("dev"));

//send http to https
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    console.log("someone used http");
    res.redirect("https://" + req.headers.host + req.url);
  }
});

//shares the folder public
app.use(express.static(path.join(__dirname, "public")));

//checks for css files in css folder
app.use(express.static(path.join(__dirname, "public", "css")));

http.createServer(app).listen(80, () => {
  console.log("Listening... on port 80");
});

https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/colomb.nl/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/colomb.nl/cert.pem"),
      ca: fs.readFileSync("/etc/letsencrypt/live/colomb.nl/chain.pem"),
    },
    app
  )
  .listen(443, () => {
    console.log("Listening... on port 443");
  });
