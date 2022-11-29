const bcrypt = require('bcryptjs')

class SignUp {
    serve = (username, email, password) => {
        try {
            if (this.validatePassword(password) && this.validateEmail(email)) {
                return this.invokeDAO(username, email, this.hashPassword(password))
            }
            console.log('not passes')
            throw new Error('Invalid input')
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { success: false, message, error: e.code || e }
        }
    }

    validatePassword = (password) => {
        return true
    }
    
    validateEmail = (email) => {
        return true
    }

    hashPassword = (password) => {
        return true
    }

    invokeDAO = (user) => {
        return true
    }
}

module.exports = SignUp

// bcrypt.hash(password, await this.setSalt())
// bcrypt.genSalt(10)
// password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
// email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)



