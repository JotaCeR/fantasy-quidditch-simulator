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
        it('1) Receives user s signup Request and calls Signup Action correctly.', () => {
            const fakeCallback = sinon.spy()
            const SignUpPresenter = require('../../src/presenters/users/signup.js')
            const presenterInstance = new SignUpPresenter()
            presenterInstance.present('Pepe', 'example@mail.com', 'Password123!', fakeCallback)
            expect(fakeCallback.called).to.equal(true)
        })

        xit('2) Receives lacking signup values and throws an Exception correctly.', () => {
            const args = { username: 'username', email: 'mail@example.com' }
            const SignUpPresenter = require('../../src/presenters/users/signup.js')
            const SignUpAction = require('../../src/actions/users/signup.js')
            const instance = new SignUpPresenter()
            const actionInstance = new SignUpAction()
            const mock = sinon.mock(actionInstance)
            mock.expects('activate').never().throws()
            args.callback = actionInstance.activate

            expect(instance.present(args)).to.include({ success: false, message: 'Required value(s) missing' })
            mock.verify()
        })
    })

    xdescribe('Signup Action', () => {
        it('1) Receives signup values and calls proper services for validating input.', async () => {
            const SignUpAction = require('../../src/actions/users/signup.js')
            const instance = new SignUpAction()
            const signUpServices = require('../../src/services/users/signup.js')
            const servicesInstance = {
                validatePassword: signUpServices.passwordValidator.verify,
                validateEmail: signUpServices.emailValidator.verify,
                hash: signUpServices.hash.setHash,
                salt: signUpServices.hash.setSalt,
                createUser: signUpServices.createUser.newUser,
            }
            const mock = sinon.mock(servicesInstance)
            mock.expects('validatePassword').once().throws()
            mock.expects('validateEmail').once().throws()
            mock.expects('hash').once().throws()
            mock.expects('salt').once().throws()
            mock.expects('createUser').once().throws()

            await instance.activate({ username: 'username', email: 'example@mail.com', password: '@Password1!aaaAAA' }, servicesInstance)
            mock.verify()
        })
    })

    xdescribe('', () => {
        xit('', () => {

        })
    })
})