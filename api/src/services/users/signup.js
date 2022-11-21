const bcrypt = require('bcryptjs')

class Hash {
    setHash = async (password) => {
        return await bcrypt.hash(password, await this.setSalt())
    }

    setSalt = async () => {
        return await bcrypt.genSalt(10)
    }
}

class Compare {
    compare = async (password, hash) => {
        try {
            const flag = await bcrypt.compare(password, hash)
            if (!flag) {
                throw new Error('Incorrect password')
            } else {
                return flag
            }
        } catch (e) {
            const message = e.message || e
            console.error(message)
            return { success: false, message, error: e.code || e }
        }
    }
}

class VerifyPassword {
    verify = (password) => {
        try {
            if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)) {
                return true
            } else {
                return false
            }
        } catch (e) {
            const message = e.message || e
            console.error(message)
            return { success: false, message, error: e.code || e }
        }
    }
}

class VerifyEmail {
    verify = (email) => {
        try {
            if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                return true
            } else {
                return false
            }
        } catch (e) {
            const message = e.message || e
            console.error(message)
            return { success: false, message, error: e.code || e }
        }
    }
}

class CreateUser {
    newUser = async ({ username, email, password }) => {
        return true
    }
}

module.exports = { 
    hash: new Hash(),
    compare: new Compare(),
    passwordValidator: new VerifyPassword(),
    emailValidator: new VerifyEmail(),
    createUser: new CreateUser(),
}