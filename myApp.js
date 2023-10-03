require("dotenv").config({ path: "./.env" });
const e = require("express");
let express = require("express");
const { log } = require("fcc-express-bground");
let app = express();

//console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

// log root level
app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// routing
app.get("/", function (req, res) {
  //console.info(req.url);
  //res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let data = "Hello json";
  //console.info(process.env.MESSAGE_STYLE);
  if (process.env.MESSAGE_STYLE === "uppercase") {
    data = data.toUpperCase();
  } else {
    data;
  }

  res.json({
    message: data,
  });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) =>{
  let datas = req.params.word;
  res.json({
    echo: datas,
  });
});

app.get("/name", (req, res) =>{
  let firstName = req.query.first;
  let lastName = req.query.last;
  res.json({
    name: firstName + " " + lastName,
  });
});

module.exports = app;
