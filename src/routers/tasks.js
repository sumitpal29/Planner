const express = require("express");
const router = new express.Router();
const Task = require("../db/models/tasks");

// API end point to create new task
router.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  try {
    await newTask.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) res.status(404).send();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const allowedProps = ["description", "completed"];
  const props = Object.keys(req.body);
  const isValidUpdate = props.every((prop) => allowedProps.includes(prop));

  if (!isValidUpdate)
    return res.status(400).send({
      error: "You are not allowed to update above properties",
    });

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({});

    props.forEach((prop) => (task[prop] = req.body[prop]));
    await task.save().then((t) => res.status(200).send(t));
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) res.status(404).send();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
