const request = require("supertest");
const app = require("../src/app");
const User = require("../src/db/models/users");
const Task = require('../src/db/models/tasks');
const { userId, userTwo, taskOne, userOne, configureDatabase } = require("./fixtures/db");

// Jest provides test function globally across the project 
// test('string - name for your test', funtion)

// test why
// testing saves time
// easy to maintain function/features in a big project
// creates reusable software
// In future changes, bugs will easily identified.
// flexibility
// - refactoring
// - collabs
// - profiling -> speed check 


beforeEach(configureDatabase);

test('Should create task for a user', async () => {
    const task = await request(app).post('/tasks')
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'test task'
        }).expect(201)
    // assert default value for completed is false
    expect(task.body.completed).toBe(false)
    const fetchedTask = await Task.findById(task.body._id)
    expect(fetchedTask).not.toBeNull();
})

test('should return user one two tasks', async () => {
    const userOneTasks = await request(app).get('/tasks')
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    expect(userOneTasks.body.length).toBe(2)
})

test('should not allow usertwo to delete userone tasks', async () => {
    await request(app).delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
});