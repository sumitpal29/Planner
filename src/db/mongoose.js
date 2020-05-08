const mongoose = require("mongoose");
const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

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
