require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dns = require("dns");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const options = {
  all: true,
};

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const domain = [];

app.post("/api/shorturl", (req, res) => {
  let url = new URL(req.body.url);
  console.log("url " + url);

  dns.lookup(url.hostname, options, (err, value) => {
    if (err) {
      console.log("err " + err + value);
      res.json({ error: "invalid url" });
    } else {
      domain.push(url);

      let index = domain.indexOf(url);

      res.json({ original_url: url, short_url: index });
    }
  });
});

app.get("/api/shorturl/:url", (req, res) => {
  let url = domain.at(req.params.url);
  res.redirect(url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
