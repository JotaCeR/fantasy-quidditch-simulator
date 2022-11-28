class SignUp {
    constructor(action) {
        this.dependency = action
    }

    present = async (username, email, password) => {
        try {
            return await this.invokeAction(username, email, password)
        } catch (e) {
            const message = e.message || e
            console.error(message)
            return { success: false, message, error: e.code || e }
        }
    }

    invokeAction = async (username, email, password) => {
        try {
            return true
        } catch (e) {
            const message = e.message || e
            console.error(message)
            return { success: false, message, error: e.code || e }
        }
    }
}

module.exports = SignUp