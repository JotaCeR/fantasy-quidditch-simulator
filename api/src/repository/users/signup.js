const User = require('../models/users.js')

class SignUp {
    signUser = async (user) => {
        try {
            const sign = await new User(user)
            const savedSign = await sign.save()
            return { success: true, id: savedSign._id.toString() }
        } catch (e) {
            console.error(e)
            const message = e.message || e
            return { success: false, message, error: e.code || e }
        }
    }
}

module.exports = SignUp