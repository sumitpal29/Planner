const express = require("express");
// connect mongo db
require("./db/mongoose");
const UserRoutes = require("./routers/users");
const TaskRoutes = require("./routers/tasks");

const port = process.env.PORT || 3000;
const app = express();

// autumatically parse incoming json into a object
// which we can access from request handler
app.use(express.json());
// tell app to use Users and Tasks routers
app.use(UserRoutes);
app.use(TaskRoutes);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});


// const Task = require('./db/models/tasks');
// const User = require('./db/models/users');

// const main = async () => {
//   // const task = await Task.findById('5ec6e6ad1d05ad07b3853c47');
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner);

//   // const user = await User.findById('5ec2f34436ab089c27262ebf')
//   // await user.populate('tasks').execPopulate()
//   // console.log(user.tasks)
// }

// main()