const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/db/models/users");
const Task = require("../../src/db/models/tasks");

const userId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userId,
  name: "Sumit",
  email: "sumit@example.com",
  password: "sum!t321",
  tokens: [
    {
      token: jwt.sign({ _id: userId }, process.env.JWTCODE),
    },
  ],
};

const user2Id = new mongoose.Types.ObjectId();
const userTwo = {
  _id: user2Id,
  name: "Pritha",
  email: "pritha@example.com",
  password: "pritha!t321",
  tokens: [
    {
      token: jwt.sign({ _id: user2Id }, process.env.JWTCODE),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Test on one - is false 1',
  completed: false,
  owner: userOne._id
}
const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Test on two - is true 2',
  completed: true,
  owner: userOne._id
}
const taskThird = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Test on three - is true 3',
  completed: true,
  owner: userTwo._id
}

const configureDatabase = async (done) => {
  await User.deleteMany();
  await Task.deleteMany();

  await new User(userOne).save();
  await new User(userTwo).save();

  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThird).save();
  done()
};

module.exports = {
  userId,
  userOne,
  userTwo,
  configureDatabase,
  taskOne
};
