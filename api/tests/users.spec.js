const { expect } = require('chai')
const request = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../src/app.js')

describe('E — Users', () => {
    describe('Setup', () => {
        it('Successfull connection', async () => {
            const response = await request(app).get('/connect').set('Accept', 'application/json')
            expect(response.status).to.equal(200)
        })

        it('Sucessfull connection II', async () => {
            const response = await request(app).get('/connect').set('Accept', 'application/json')
            expect(response.body.message).to.equal('Success')
        })
    })

    describe('Register', () => {
        it('Receive user input & responses successfully', async () => {
            const response = await request(app).post('/users/signup').send({username: 'John', email: 'example@mail.com', password: 'Password1!'}).set('Accept', 'application/json')
            expect(response.status).to.equal(200)

        })

        it('Receive user input & hashes password', async () => {
            const response = await request(app).post('/users/signup').send({username: 'John', email: 'example@mail.com', password: 'Password1!'}).set('Accept', 'application/json')
            const compare = await bcrypt.compare('Password1!', response.body.password)
            expect(compare).to.equal(true)
        })

        it('Receive user input & verifies password fullfill extension & characters type rule', async () => {
            const response = await request(app).post('/users/signup').send({username: 'John', email: 'example@mail.com', password: 'Password1!' }).set('Accept', 'application/json')
            expect(response.body.message).not.to.equal('Invalid password')
        })
    })
})