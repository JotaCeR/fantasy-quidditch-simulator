class SignUp {
    present = (username, email, password, callback) => {
        try {
            return callback({ username, email, password })
        } catch (e) {
            const message = e.message || e
            console.error(message)
            return { success: false, message, error: e.code || e }
        }
    }
}

module.exports = SignUp