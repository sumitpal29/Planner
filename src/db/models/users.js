const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./tasks");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Email is not valid.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(val) {
        if (val.toLowerCase().includes("password")) {
          throw new Error("Password must not contain 'password' string!!");
        }
      },
    },
    age: {
      type: Number,
      validate(val) {
        if (val < 0) {
          throw new Error("Age must be a positive number");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avator: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

// middleware for deleting all the task when a user is deleted
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({
    owner: user._id,
  });
  next();
});

userSchema.pre("save", async function (next) {
  // this should be a normal function thus we get access of the data is going to get saved
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // next tells mongoose that this middleware is done doing tasks, go ahead
  next();
});

userSchema.statics.findByCredential = async (email, password) => {
  const user = await User.findOne({ email });
  console.log('in', user)
  if (!user) {
    throw new Error("Email not registered!");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password or Email did not Matched");
  }

  return user;
};
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  // data and secret key -> returns token
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWTCODE);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  // for rescrticting user data
  // user don't need hashed passwords, active tokens
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  delete user.avator;
  return user;
};

userSchema.virtual("tasks", {
  ref: "Task", // a reference between Task and the User on the virtual - not stored in DB
  localField: "_id", // the local id
  foreignField: "owner", // is the of the field on the task that will set the relationship
});
// go to Tasks and use my (user) _id and find them in owner key :) 

// create a model for user
const User = mongoose.model("User", userSchema);

module.exports = User;

// const myfunc = async () => {
//   const pass = "Me&*^$*78648";
//   const hashed = await bcrypt.hash(pass, 8);

//   console.log(pass);
//   console.log(hashed);
//   const isValid = await bcrypt.compare(pass, hashed);
//   console.log(isValid);
// };

// myfunc();
