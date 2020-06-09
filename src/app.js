// setup app
const express = require("express");
// connect mongo db
require("./db/mongoose");
const UserRoutes = require("./routers/users");
const TaskRoutes = require("./routers/tasks");

const app = express();

// autumatically parse incoming json into a object
// which we can access from request handler
app.use(express.json());
// tell app to use Users and Tasks routers
app.use(UserRoutes);
app.use(TaskRoutes);

module.exports = app