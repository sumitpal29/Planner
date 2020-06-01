const mongoose = require("mongoose");
const connectionURL = process.env.MONGODB_URL;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://task-manager:<password>@cluster0-1yrdo.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// Initial learings
// const userModel = require('./models/users');
// const taskModel = require('./models/tasks');

// create a model for user
// const User = mongoose.model("User", userModel);
// const Task = mongoose.model("Task", taskModel);

// const task = new Task({
//   description: "Read mongo db tutorials",
// });

// task
//   .save()
//   .then((e) => console.log(e))
//   .catch((err) => console.log(`${err.name} : ${err.message}`));

// const userDetails = new User({
//   name: "Subhash",
//   age: "29",
//   email: "  subhash@gmail.com   ",
//   password: "password",
// });

// userDetails
//   .save()
//   .then((e) => console.log(e))
//   .catch((err) => console.log(`${err.name} : ${err.message}`));
