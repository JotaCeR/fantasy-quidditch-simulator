class SignUp {
    present = async (username, email, password, callback) => {
        try {
            return await callback({ username, email, password })
        } catch (e) {
            const message = e.message || e
            console.error(message)
            return { success: false, message, error: e.code || e }
        }
    }
}

module.exports = SignUp