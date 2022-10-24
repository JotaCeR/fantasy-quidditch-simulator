const { expect } = require('chai')
const request = require('supertest')
const app = require('../src/app.js')

describe('E — Users', () => {
    describe('Setup', () => {
        it('Successfull connection', async () => {
            const response = await request(app).get('/').set('Accept', 'application/json')
            expect(response.status).to.equal(200)
        })

        it('Sucessfull connection II', async () => {
            const response = await request(app).get('/').set('Accept', 'application/json')
            expect(response.body.message).to.equal('Success')
        })
    })
})