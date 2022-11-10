const { expect } = require('chai')
const request = require('supertest')
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
            const response = await request(app).post('/users/signup').send({username: 'John', email: 'example@mail.com', password: 'password123'}).set('Accept', 'application/json')
            expect(response.status).to.equal(200)

        })

        it('Receive user input & hashs password', async () => {
            const response = await (await request(app).post('/users/signup').send({username: 'John', email: 'example@mail.com', password: 'password123'})).set('Accept', 'application/json')
            expect(response.body.password)
        
        })

        // it('', async () => {

        // })
    })
})