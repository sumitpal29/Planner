const express = require("express");
const router = new express.Router();
const Task = require("../db/models/tasks");
const auth = require("../middleware/auth");

// API end point to create new task
router.post("/tasks", auth, async (req, res) => {
  // const newTask = new Task(req.body);
  const datum = {
    ...req.body,
    owner: req.user._id,
  };
  const newTask = new Task(datum);
  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({
    //   owner: req.user._id,
    // });
    const match = {};
    const options = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true" ? true : false;
    }
    if (req.query.per_page) {
      options.limit = parseInt(req.query.per_page);
    }
    if (req.query.per_page) {
      options.skip = parseInt(req.query.page) * parseInt(req.query.per_page);
    }
    if (req.query.sortBy) {
      // {{url}}/tasks?sortBy=createdAt:desc
      // {{url}}/tasks?sortBy=completed:as
      const str = req.query.sortBy.split(":");
      options.sort = {};
      options.sort[str[0]] = str[1] === "desc" ? -1 : 1;
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options,
      })
      .execPopulate();

    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    });

    if (!task) res.status(404).send();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedProps = ["description", "completed", "dueDate", "header"];
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
    //const task = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send({});

    props.forEach((prop) => (task[prop] = req.body[prop]));
    await task.save().then((t) => res.status(200).send(t));
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) res.status(404).send();
    res.status(201).send(task);
  } catch (e) {
    res.status(500);
  }
});

module.exports = router;
