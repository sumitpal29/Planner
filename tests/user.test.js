const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/db/models/users");

const userId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userId,
  name: "Sumit",
  email: "sumit@example.com",
  password: "sum!t321",
  tokens: [
    {
      token: jwt.sign({ _id: userId }, process.env.JWTCODE),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("should signup a new user", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      name: "Sumit",
      email: "sum@example.com",
      password: "wellnotgood12",
      age: 28,
    })
    .expect(201); // expect a status code
  // advanced assertion - after signing up
  // check the token is there are not
  // look into the database

  // assert that the database changed correctly
  // console.log(res.body.newUser._id)
  const user = await User.findById(res.body.newUser._id);
  expect(user).not.toBeNull();

  // assertion about the response
  // res should match with object
  expect(res.body).toMatchObject({
    newUser: {
      name: "Sumit",
      email: "sum@example.com",
    },
    token: user.tokens[0].token,
  });
  // password should be hashed
  expect(user.password).not.toBe("wellnotgood12");
});

test("Should login existing user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userId);
  expect(res.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "asdsadad",
    })
    .expect(400);
});

test("Should return user profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should return not user profile with unAuthorised profile", async () => {
  await request(app).get("/users/me").send().expect(400);
});

test("should not delete user profile when unauthorised", async () => {
  await request(app).delete("/users").send().expect(400);
});

test("should delete user profile", async () => {
  const res = await request(app)
    .delete("/users")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userId);
  expect(user).toBeNull();
});

/*
 * fixtures are the things that allow you to setup the environment
 * the test are going to run in. I will create a folder inside test
 * directory and keep an image which I will use during the test of
 * user trying to upload an avator
 */
test("should upload avator image", async () => {
  await request(app)
    .post("/users/me/avator")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avator", "tests/fixtures/bg.png") // form field
    .expect(200);

    const user = await User.findById(userId);
    expect(user.avator).toEqual(expect.any(Buffer))
    
    // expect({}).toBe({})
    // will fail
    // {} === {} checks same object from memory
    // so for that we have to use 
    // expect({}).toEqual({})
});


test('should update user field', async () => {
    await request(app).patch('/users/me')
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Sumeet'
        }).expect(200)
    
    const user = await User.findById(userId)
    expect(user.name).toBe('Sumeet')
})

test('should not update user field', async () => {
    await request(app).patch('/users/me')
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            college: 'JGEC'
        }).expect(400)
})