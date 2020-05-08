const express = require("express");
// connect mongo db
require("./db/mongoose");
const User = require("./db/models/users");

const port = process.env.PORT || 3000;
const app = express();

// autumatically parse incoming json into a object
// which we can access from request handler
app.use(express.json());
// create new user
app.post("/users", (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err));
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
