const express = require("express");
const router = new express.Router();
const User = require("../db/models/users");

// create new user
router.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) res.status(404).send();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// update user data by id
router.patch("/users/:id", async (req, res) => {
  const allowedProps = ["name", "email", "age"];
  const props = Object.keys(req.body);
  const isValidUpdate = props.every((prop) => allowedProps.includes(prop));

  if (!isValidUpdate)
    return res.status(400).send({
      error: "You are not allowed to update above properties",
    });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).send({});
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
