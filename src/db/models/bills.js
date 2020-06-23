const mongoose = require("mongoose");
// time stamp
// header
// description
// bill image
// items - name, quantity, price

const billSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      trim: true,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    items: [],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
