const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Shemas
const exerciseSchema = new mongoose.Schema({
  userId: String,
  username: String,
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});

const userSchema = new mongoose.Schema({
  username: String,
});

// Models

let User = mongoose.model("User", userSchema);

let Exercise = mongoose.model("Exercise", exerciseSchema);

// create a new user
app.post("/api/users", (req, res) => {
  const inputUsername = req.body.username;

  console.log("new username " + inputUsername);

  let newUser = new User({ username: inputUsername });

  newUser
    .save()
    .then((user) => {
      console.log("new user " + user);
      res.json({ username: user.username, _id: user._id });
    })
    .catch((err) => {
      console.log("err " + err);
      res.json({ message: "User creation failed!" });
    });

  /*
  newUser.save((err, user) => {
    if (err) {
      console.log("err " + err);
      res.json({ message: "User creation failed!" });
    }
    console.log("new user " + user);
    res.json({ username: user.username, _id: user._id });
  });
  */
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
