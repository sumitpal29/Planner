const mongoose = require("mongoose");
const {currentDateOnly} = require('../../utils')

const habitSchema = new mongoose.Schema(
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isfollowing: {
      type: Boolean,
      default: true,
    },
    data: [],
    color: {
      type: String,
      default: "#" + Math.random().toString().slice(2, 8),
    },
  },
  {
    timestamps: true,
  }
);

habitSchema.methods.markDate = async function ({date, isChecked}) {
  const habit = this;

  const doneAt = currentDateOnly(new Date());
  
  if(habit.data[habit.data.length - 1] === doneAt) {
      // remove last item
      return;
  }
  // console.log(typeof doneAt, habit.data)
  habit.data.push(doneAt);
  await habit.save();
  return doneAt;
};

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
