const bcrypt = require('bcryptjs')

class SignUp {
    constructor (repository) {
        this.dependency = repository
    }

    serve = async (username, email, password) => {
        try {
            if (this.validatePassword(password) && this.validateEmail(email)) {
                return await this.invokeRepository(username, email, await this.hashPassword(password))
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
}

module.exports = SignUp