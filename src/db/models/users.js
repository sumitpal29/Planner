module.exports = {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
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
};
