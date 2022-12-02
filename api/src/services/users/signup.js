const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { JWT_SECRET } = process.env

class SignUp {
    constructor (repository) {
        this.dependency = repository
    }

    serve = async (username, email, password) => {
        try {
            if (this.validatePassword(password) && this.validateEmail(email) && await this.verifyEmail(email)) {
                const sign = await this.invokeRepository(username, email, await this.hashPassword(password))
                return { success: true, token: this.signToken(sign.id) }
            }
            throw new Error('Invalid input')
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { success: false, message, error: e.code || e }
        }
    }

    validatePassword = (password) => {
        try {
            if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)) {
                return true
            }
            throw new Error('Invalid password')
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { success: false, message, error: e.code || e }
        }
    }
    
    validateEmail = (email) => {
        try {
            if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                return true
            }
            throw new Error('Invalid email')
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { success: false, message, error: e.code || e }
        }
    }

    verifyEmail = async (email) => {
        try {
            const flag = await this.dependency.checkEmail(email)
            if (!flag) {
                return true
            } else {
                throw new Error('This email already exists')
            }
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { sucess: false, message, error: e.code || e }
        }
    }

    hashPassword = async (password) => {
        try {
            return await bcrypt.hash(password, await bcrypt.genSalt(10))
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { success: false, message, error: e.code || e }
        }
    }

    invokeRepository = async (username, email, password) => {
        try {
            const user = {
                username,
                email,
                password
            }
            
            return await this.dependency.signUser(user)
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { success: false, message, error: e.code || e }
        }
    }

    signToken = (credential) => {
        return jwt.sign({ credential }, JWT_SECRET)
    }
}

module.exports = SignUp