const express = require("express");
const router = new express.Router();
const User = require("../db/models/users");
const auth = require("../middleware/auth");

// create new user
router.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    const token = await newUser.generateAuthToken();

    res.status(201).send({ newUser, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredential(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    console.log('in')

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((ob) => {
      // filter out which is matched
      return ob.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/logout-all", auth, async (req, res) => {
  try {
    req.user && (req.user.tokens = []);
    await req.user.save();
    res.send({
      status: "Logged-out from all sessions",
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).send(users);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
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
router.patch("/users/me", auth, async (req, res) => {
  const allowedProps = ["name", "email", "age", "password"];
  const props = Object.keys(req.body);
  const isValidUpdate = props.every((prop) => allowedProps.includes(prop));

  if (!isValidUpdate)
    return res.status(400).send({
      error: "You are not allowed to update above properties",
    });

  try {
    const {user} = req;

    props.forEach((prop) => {
      user[prop] = req.body[prop];
    });

    await user.save().then((e) => res.status(200).send(e));
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/users/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) res.status(404).send();
    await req.user.remove();
    res.status(201).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
