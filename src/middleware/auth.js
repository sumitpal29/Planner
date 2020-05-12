const auth = async (req, res, next) => {
  // await
  console.log("Middleware function called!!");
  next();
};

module.exports = auth;
