const express = require("express");
const router = new express.Router();
const Habit = require("../db/models/habit");
const auth = require("../middleware/auth");

// publish habit
router.post("/habits", auth, async (req, res) => {
  const datum = {
    ...req.body,
    owner: req.user._id,
  };

  const newHabit = new Habit(datum);

  try {
    await newHabit.save();
    res.status(201).send(newHabit);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/habits", auth, (req, res) => {
  res.status(200).send({
    msg: "success",
  });
});

// update habit
router.patch("/habits/:id", auth, async (req, res) => {
  const allowedProps = ["header", "description", "isfollowing", "color"];
  const props = Object.keys(req.body);
  const isValidUpdate = props.every((prop) => allowedProps.includes(prop));

  if (!isValidUpdate)
    return res.status(400).send({
      error: "You are not allowed to update above properties",
    });

  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!habit) return res.status(404).send({});

    props.forEach((prop) => (habit[prop] = req.body[prop]));
    await habit.save().then((t) => res.status(200).send(t));
  } catch (err) {
    res.status(404).send(err);
  }
});

router.patch("/habits/update/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!habit) return res.status(404).send({});

    const date = await habit.markDate({
      date: req.body.date,
      isChecked: req.body.isChecked,
    });
    console.log("date");

    res.status(200).send(habit);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/habits/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const habit = await Habit.findOneAndDelete({ _id, owner: req.user._id });

    if (!habit) return res.status(404).send({ message: "Habit not found" });
    res.status(201).send(habit);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/habits/active", auth, async (req, res) => {
  try {
    const habits = await Habit.find({ owner: req.user._id, isfollowing: true });
    if (!habits) return res.status(404).send({ message: "Habit not found" });
    res.status(200).send(habits);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/habits/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const habit = await Habit.findOne({ _id, owner: req.user._id });
    if (!habit) return res.status(404).send({ message: "Habit not found" });
    res.status(200).send(habit);
  } catch (err) {
    res.status(404).send(err);
  }
});
module.exports = router;
