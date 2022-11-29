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
        return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ? true : false
    }

    hashPassword = (password) => {
        
    }

    invokeDAO = (user) => {
        
    }
}

module.exports = SignUp

// bcrypt.hash(password, await this.setSalt())
// bcrypt.genSalt(10)



