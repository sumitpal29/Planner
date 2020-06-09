const request = require('supertest')
const app = require('../src/app')

test('should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Sumit',
        email: 'sumit@charts.com',
        password: 'alliswell',
        age: 28
    }).expect(201) // expect a status code
})