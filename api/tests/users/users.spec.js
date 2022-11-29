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

    describe('Signup Service', () => {
        it('1) Receives signup s activation invocation and Signup Service "create user" method calls proper services correctly.', async () => {
            const SignUpService = require('../../src/services/users/signup.js')
            const serviceInstance = new SignUpService({ saveUser: sinon.fake() })
            const fake = sinon.fake.returns(true)
            const fake2 = sinon.fake.returns(true)
            const fake3 = sinon.fake.returns(true)
            const fake4 = sinon.fake.returns(true)
            sinon.replace(serviceInstance, 'validatePassword', fake)
            sinon.replace(serviceInstance, 'validateEmail', fake2)
            sinon.replace(serviceInstance, 'hashPassword', fake3)
            sinon.replace(serviceInstance, 'invokeDAO', fake4)

            await serviceInstance.serve('Username', 'example@mail.com', 'Password1!')

            expect(fake.calledWith('Password1!')).to.equal(true)
            expect(fake2.calledWith('example@mail.com')).to.equal(true)
            expect(fake3.calledWith('Password1!')).to.equal(true)
            expect(fake4.calledWith('Username', 'example@mail.com')).to.equal(true)
        })

        it('2) Validate Password service checks password and returns true if valid format matches.', () => {
            const SignUpService = require('../../src/services/users/signup.js')
            const serviceInstance = new SignUpService()

            expect(serviceInstance.validatePassword('Password1!')).to.equal(true)
        })

        it('3) Validate Password service checks password and throws Exception if input it s invalid.', () => {
            const SignUpService = require('../../src/services/users/signup.js')
            const serviceInstance = new SignUpService()
            const result = serviceInstance.validatePassword('zzz')

            expect(result).not.to.equal(true)
            expect(result).to.include({ success: false, message: 'Invalid password' })
        })

        it('4) Validate Email service checks email and returns true if valid format matches.', () => {
            const SignUpService = require('../../src/services/users/signup.js')
            const serviceInstance = new SignUpService()

            expect(serviceInstance.validateEmail('example@mail.com')).to.equal(true)
        })

        it('5) Validate Email service checks email and throws Exception when input format it s invalid.', () => {
            const SignUpService = require('../../src/services/users/signup.js')
            const serviceInstance = new SignUpService()
            const result = serviceInstance.validateEmail('zzz')

            expect(result).not.true.equal(true)
            expect(result).to.include({ success: false, message: 'Invalid email' })
        })

        it('6) Hash Password service receives a string and hashes the string correctly.', async () => {
            const SignUpService = require('../../src/services/users/signup.js')
            const serviceInstance = new SignUpService()
            const result = await serviceInstance.hashPassword('Password1!')
            const compare = await bcrypt.compare('Password1!', result)

            expect(result).not.to.equal('Password1!')
            expect(compare).to.equal(true)
        })

        it('7) Executes Signup DAO invoking method correctly.', async () => {
            const SignUpService = require('../../src/services/users/signup.js')
            const dependency = {
                saveUser: sinon.fake()
            }
            const serviceInstance = new SignUpService(dependency)

            await serviceInstance.serve('Username', 'example@mail.com', 'Password1!')

            expect(dependency.saveUser.called).to.equal(true)
        })
    })

    describe('Signup DAO', () => {
        it('1) Receives signup s serve invocation and Signup DAO calls DB for saving new user object. ', async () => {
            const SignUpDAO = require("../../src/DAO's/users/signup.js")
            const dbDependency = {
                signUser: sinon.fake.returns()
            }
            const DAOInstance = new SignUpDAO(dbDependency)
            const user = {
                username: 'Username',
                email: 'example@mail.com',
                password: '####'
            }

            await DAOInstance.saveUser(user)

            expect(dbDependency.signUser.calledWith(user)).to.equal(true)
        })
    })
})