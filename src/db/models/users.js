const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
});

userSchema.pre("save", async function (next) {
  // this should be a normal function thus we get access of the data is going to get saved
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("called before", user.password);
  // next tells mongoose that this middleware is done doing tasks, go ahead
  next();
});

userSchema.statics.findByCredential = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email not registered!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password or Email did not Matched");
  }
  console.log('in 4');

  return user;
};
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
