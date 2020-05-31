const express = require("express");
const router = new express.Router();
const User = require("../db/models/users");
const auth = require("../middleware/auth");
const multer = require("multer"); // hanle image
const sharp = require("sharp"); // image processing - resize - conversion
const { sendWelcomeMail, sendCancelationMail } = require("../mailer");
const uploads = multer({
  // dest: "avators/", // not required as we are going to use the file and saving it in db
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("file must be a JPG or PNG"));
    }
    cb(undefined, true);
  },
});

// create new user
router.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    const token = await newUser.generateAuthToken();
    sendWelcomeMail(newUser.name, newUser.email);
    res.status(201).send({ newUser, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredential(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// logout
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

// logout-all
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
    const { user } = req;

    props.forEach((prop) => {
      user[prop] = req.body[prop];
    });

    await user.save().then((e) => res.status(200).send(e));
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/users/:id", auth, async (req, res) => {
  // const _id = req.params.id;

  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) res.status(404).send();
    await req.user.remove();
    sendCancelationMail(req.user.name, req.user.email);
    res.status(201).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// upload a user avator
router.post(
  "/users/me/avator",
  auth,
  uploads.single("avator"),
  async (req, res) => {
    // sharp is async -  sharp('takes buffer') - provides chaining methods
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .png()
      .toBuffer();
    req.user.avator = buffer; // cintains binary data
    await req.user.save();
    res.send({
      message: "File uploaded",
    });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
// delete a user avator
router.delete("/users/me/avator", auth, async (req, res) => {
  try {
    req.user.avator = undefined; // remove
    await req.user.save();
    res.send({
      message: "File deleted",
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a user avator
router.get("/users/:id/avator", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user || !user.avator) {
      res.status(400).send({
        error: "user image not found",
      });
    }
    // set header with content-type
    res.set("content-type", "image/png");
    res.status(200).send(user.avator);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
