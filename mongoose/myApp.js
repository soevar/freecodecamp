require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);
//console.log('person ' + Person);

const createAndSavePerson = (done) => {
  let pardi = new Person({ name: 'Bang Pardi', age: 25, favoriteFoods: ['reading', 'coding'] });
  pardi.save( function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });

  //done(null /*, data*/);
};

let arrayOfPeople =[
  { name: 'Sofwan', age: 30, favoriteFoods: ['watching', 'mancing']},
  { name: 'Wandy', age: 31, favoriteFoods: ['burrito', 'running']},
  { name: 'Firgi', age: 28, favoriteFoods: ['coding', 'mancing']}  
]

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function(err, people){
        if (err) return console.log(err);
        done(null, people);
    })
  //done(null /*, data*/);
};

//let personName='Firgi';

const findPeopleByName = (personName, done) => {
    Person.find({name:personName}, function(err, personFound){
        if (err) return console.log(err);
        done(null, personFound);
    });
  //done(null /*, data*/);
};

//let food = 'mancing';

const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods:food}, function(err, data){
        if (err) return console.log(err);
        done(null, data);
    });
  //done(null /*, data*/);
};

const findPersonById = (personId, done) => {
    Person.findById(personId, function(err, data){
        if (err) return console.log(err);
        done(null, data);
    });
  //done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person)=>{
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatePerson)=>{
        if (err) return console.log(err);
done(null, updatePerson);
    });
  });

  //done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, {new:true}, (err, updateDoc)=>{
    if (err) return console.log(err);
    done(null, updateDoc);
  })

  //done(null /*, data*/);
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, removeDoc)=>{
        if (err) return console.log(err);
        done(null, removeDoc);
    });
  //done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove}, (err, res)=>{
    if (err) return console.log(err);
    done(null, res);
  });

  //done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods:foodToSearch})
  // Here: 1 for ascending	order and -1 for descending order.
  .sort({name:1})
  .limit(2)
  // Here: 0 means false and thus hide name property; 1 means true so age property will show.
  .select({ age: 0 })
  .exec((err, data)=>{
    if (err) return console.log(err);
    done(null, data);
  });

  //done(null /*, data*/);
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
