let express = require("express");
let app = express();

//console.log("Hello World");

// routing
app.get("/", function (req, res) {
  console.info(req.url);
  res.send("Hello Express");
});

module.exports = app;
