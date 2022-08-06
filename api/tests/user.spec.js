const { expect } = require('chai')
const request = require('supertest')
// const app = require('../src/app.js)

describe('User Requests', () => {
    describe('Requests: Status 200 || Ok', () => {
        // SIGNUP
        it('SIGNUP 1: Should successfully build a new User and get a response w/"text" value = "Success".', async () => {

        })

        it('SIGNUP 2: Should successfully build a new User, save it on the DB and get a response w/"saved" value = true.', async () => {

        })

        it('SIGNUP 3: Should successfully build a new User, save it on the DB, encrypt the password and get a response w/the proper values.', async () => {

        })

        // EDIT USER
        it('EDIT USER 1: Should successfully update an existing User and get a response w/"text" value = "Success".', async () => {

        })

        it('EDIT USER 2: Should successfully update an existing User, save it on the DB and get a response w/"saved" value = true.', async () => {

        })

        // SIGNIN
        it('SIGNIN W/TOKEN 1: Should successfully get the information of an specified User, generate a token for it and get a response w/the relevant values && the new token.', async () => {

        })

        // DELETE
        it('DELETE USER: Should successfully get the specified user from the DB, erase it and get a response w/the id of the erased user.', async () => {

        })
    })

    describe('Requests: Status 400 || Error', () => {
        // SIGNUP
        it('SIGNUP 1: Shouldn t successfully build a new User if there is any necessary value lacking on the request and get a response w/"text" value = "Failure, some required values missing".', async () => {

        })

        it('SIGNUP 2: Shouldn t successfully build a new User if there is any invalid value on the request and get a response w/"text" value = "Failure, ${value} invalid, should be ${required data type}".', async () => {

        })

        it('SIGNUP 3: Shouldn t successfully build a new User if there is already some User in existence with the same email registered and get a response w/"text" value = "Failure, ${email} already registered".', async () => {

        })

        it('SIGNUP 4: In case DB was unable to save the new User it should  get a response w/"text" value = "Failure, there was a problem with the database" && w/"database_message" value = "${database error message}".', async () => {

        })

        // EDIT USER
        it('EDIT USER 1: Shouldn t update no User if any provided value is invalid and should get a response w/"text" value = "Failure, ${value} it s invalid".', async () => {

        })

        it('EDIT USER 2: Shouldn t update no User if the provided password is invalid and should get response w/"text" value = "Failure, invalid password".', async () => {

        })

        it('EDIT USER 3: Shouldn t update no User if the provided token is invalid or has expired and should get response w/"text" value = "Failure, no token provided/expired token".', async () => {

        })

        // SIGNIN
        it('SIGNIN 1: Shouldn t successfully login any User if there is no email registered for that SignIn attempt and should get a response w/"test" value = "Failure, there is no account registered under that ${email}".', async () => {

        })

        it('SIGNIN 2: Shouldn t successfully login any User if the provided password it s invalid and should get a response w/"text" value = "Failure, invalid password".', async () => {

        })

        // DELETE
        it('DELETE USER 1: Shouldn t successfully delete an user if no id is provided and get a response w/"text" value = "Failure, no valid id was provided".', async () => {

        })

        it('DELETE USER 2: In case DB was unable to delete the User it should get a response w/"text" value = "Failure, there was a problem with the database" && w/"database_message" value = "${database error message}".', async () => {

        })

        it('DELETE USER 3: Shouldn t successfully delete an user if no token is providad or if it s invalid and should get a response w/"text" value = "Failure, no token provided/expired token".', async () => {

        })
    })
})