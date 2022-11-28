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

    describe('Signup Presenter', () => {
        it('1) Receives user s signup Request and calls Signup Action invoking method correctly.', async () => {
            const SignUpPresenter = require('../../src/presenters/users/signup.js')
            const presenterInstance = new SignUpPresenter()
            const fake = sinon.fake()
            sinon.replace(presenterInstance, 'invokeAction', fake)

            await presenterInstance.present('Pepe', 'example@mail.com', 'Password123!')

            expect(fake.calledWith('Pepe', 'example@mail.com', 'Password123!')).to.equal(true)
        })

        it('2) Executes Signup Action invoking method correctly.', async () => {
            const SignUpPresenter = require('../../src/presenters/users/signup.js')
            const action = {
                activate: sinon.fake()
            }
            const presenterInstance = new SignUpPresenter(action)
            await presenterInstance.present('Pepe', 'example@mail.com', 'Password123!')
            
            expect(action.activate.calledWith('Pepe', 'example@mail.com', 'Password123!')).to.equal(true)
        })
    })

    describe('Signup Action', () => {
        it('1) Receives signup s presentation invocation and calls Signup Service invoking method correctly.', async () => {
            const SignUpAction = require('../../src/actions/users/signup.js')
            const actionInstance = new SignUpAction()
            const fake = sinon.fake()
            sinon.replace(actionInstance, 'invokeService', fake)

            await actionInstance.activate('Username', 'mail@example.com', 'Password123!')

            expect(fake.calledWith('Username', 'mail@example.com', 'Password123!')).to.equal(true)
        })

        it('2) Executes Signup Service invoking method correctly.', async () => {
            const SignUpAction = require('../../src/actions/users/signup.js')
            const service = {
                serve: sinon.fake()
            }
            const actionInstance = new SignUpAction(service)

            await actionInstance.activate('Username', 'mail@example.com', 'Password123!')

            expect(service.serve.calledWith('Username', 'mail@example.com', 'Password123!')).to.equal(true)
        })
    })

    xdescribe('Signup Service', () => {
        it('1) Receives signup s activation and provides proper service.', async () => {
            const SignUpService = require('../../src/services/users/signup.js')
            const serviceInstance = new SignUpService()

            serviceInstance.createUser({ username: 'Username', email: 'example@mail.com', password: 'Password1!' })
        })
    })

    xdescribe('', () => {
        xit('', () => {

        })
    })

    xdescribe('', () => {
        xit('', () => {

        })
    })
})