const mongoose = require("mongoose");
const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// create a model for user
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const Task = mongoose.model("Task", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const task = new Task({
  description: "Email Naresh about your feedback!!",
  completed: true,
});

task
  .save()
  .then((e) => console.log(e))
  .catch((err) => console.log(`${err.name} : ${err.message}`));

// const userDetails = new User({
//   name: "Pritha",
//   age: "26 years old",
// });

// userDetails
//   .save()
//   .then((e) => console.log(e))
//   .catch((err) => console.log(`${err.name} : ${err.message}`));
