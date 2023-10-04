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
});

// get all user
app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      if (users.length === 0) {
        res.json({ message: "There are no users in the database!" });
      }

      console.log("all user " + users);
      res.json(users);
    })
    .catch((err) => {
      console.log("err " + err);
      res.json({ message: "Getting all users failed!" });
    });
});

// create a new exercise
// @param _id
app.post("/api/users/:_id/exercises", (req, res) => {
  let userId = req.params._id;
  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date;

  //? Check for date
  if (!date) {
    date = new Date().toISOString().substring(0, 10);
  }

  console.log(
    "looking for user with id [".toLocaleUpperCase() + userId + "] ..."
  );

  //? Find the user
  User.findById(userId)
    .then((userInDb) => {
      let newExercise = new Exercise({
        userId: userInDb._id,
        username: userInDb.username,
        description: description,
        duration: parseInt(duration),
        date: date,
      });

      newExercise
        .save()
        .then((exercise) => {
          res.json({
            username: userInDb.username,
            description: exercise.description,
            duration: exercise.duration,
            date: new Date(exercise.date).toDateString(),
            _id: userInDb._id,
          });
        })
        .catch((err) => {
          console.log("err " + err);
          res.json({ message: "Exercise creation failed!" });
        });
    })
    .catch((err) => {
      if (err) {
        console.error(err);
        res.json({
          message: "There are no users with that ID in the database!",
        });
      }
    });
});

// get a user's exercise log
// @param _id
app.get("/api/users/:_id/logs", async function (req, res) {
  const userId = req.params._id;
  const from = req.query.from || new Date(0).toISOString().substring(0, 10);
  const to = req.query.to || new Date(Date.now()).toISOString().substring(0, 10);
  const limit = Number(req.query.limit) || 0;

  console.log("### get the log from a user ###".toLocaleUpperCase());

  //? Find the user
  let user = await User.findById(userId).exec();

  console.log(
    "looking for exercises with id [".toLocaleUpperCase() + userId + "] ..."
  );

  //? Find the exercises
  let exercises = await Exercise.find({
    userId: userId,
    date: { $gte: from, $lte: to },
  })
    .select("description duration date")
    .limit(limit)
    .exec();

  let parsedDatesLog = exercises.map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
    };
  });

  res.json({
    _id: user._id,
    username: user.username,
    count: parsedDatesLog.length,
    log: parsedDatesLog,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
