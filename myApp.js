let express = require("express");
let app = express();

//console.log("Hello World");

// routing
app.get("/", function (req, res) {
  console.info(req.url);
  //res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
