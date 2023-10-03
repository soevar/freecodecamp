require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);
console.log('person ' + Person);

const createAndSavePerson = (done) => {
  let pardi = new Person({ name: 'Bang Pardi', age: 25, favoriteFoods: ['reading', 'coding'] });
  pardi.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });

  //done(null /*, data*/);
};

let arrayOfPeople =[
  { name: 'Sofwan', age: 30, favoriteFoods: ['watching', 'mancing']},
  { name: 'Wandy', age: 31, favoriteFoods: ['walking', 'running']},
  { name: 'Firgi', age: 28, favoriteFoods: ['coding', 'mimping']}  
]

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function(err, people){
        if (err) return console.error(err);
        done(null, people);
    })
  //done(null /*, data*/);
};

let personName='Firgi';

const findPeopleByName = (personName, done) => {
    Person.find({name:personName}, function(err, personFound){
        if (err) return console.error(err);
        done(null, personFound);
    });
  //done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
