const app = require('./app');
const port = process.env.PORT || 3000;

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