class SignUp {
    activate = async (input, callback) => {
        try {
            return await callback.createUser(input)
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { success: false, message, error: e.code || e }
        }
    }
}

module.exports = SignUp