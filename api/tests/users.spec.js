const { expect } = require('chai')
const request = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../src/app.js')
const dataBase = require('../src/database')
process.env.NODE_ENV = 'test'

describe('Unit Testing — Users', () => {
    describe('HTTP Requests', () => {
        it('Server receives successfully POST request /users/signup', async () => {
            const response = await request(app).post('/users/signup').set('Accept', 'application/json')
            expect(response.status).to.equal(200)
        })
    })

    xdescribe('', () => {
        xit('', async () => {

        })
    })
})