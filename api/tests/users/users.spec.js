const { expect } = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const bcrypt = require('bcryptjs')
const app = require('../../src/app.js')
const dataBase = require('../../src/database')
process.env.NODE_ENV = 'test'

describe('Unit Testing — Users', () => {
    describe('Signup HTTP Requests', () => {
        it('1) Server receives successfully POST request /users/signup', async () => {
            const response = await request(app).post('/users/signup').set('Accept', 'application/json')
            expect(response.status).to.equal(200)
        })

        it('2) Server responses successfully POST request /users/signup with message', async () => {
            const response = await request(app).post('/users/signup').send({ username: 'name', email: 'mail@example.com', password: '12345' }).set('Accept', 'application/json')
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('User successfully created')
        })
    })

    describe('Signup Presenters', (done) => {
        it('1) Receives signup values and handles them correctly.', () => {
            const args = { username: 'username', email: 'mail@example.com', password: '12345' }
            const SignUpPresenter = require('../../src/presenters/users/signup.js')
            const SignUpAction = require('../../src/actions/users/signup.js')
            const instance = new SignUpPresenter()
            const actionInstance = new SignUpAction()
            const mock = sinon.mock(actionInstance)
            mock.expects('activate').once()
            args.callback = actionInstance.activate

            instance.present(args)
            mock.verify()
        })

        it('2) Receives lacking signup values and throws an Exception correctly.', async () => {
            const args = { username: 'username', email: 'mail@example.com' }
            const SignUpPresenter = require('../../src/presenters/users/signup.js')
            const SignUpAction = require('../../src/actions/users/signup.js')
            const instance = new SignUpPresenter()
            const actionInstance = new SignUpAction()
            const mock = sinon.mock(actionInstance)
            mock.expects('activate').never()
            args.callback = actionInstance.activate

            mock.verify()
            expect(instance.present(args)).to.include({ success: false, message: 'Required value(s) missing' })
        })

        xit('', async () => {

        })
    })
})