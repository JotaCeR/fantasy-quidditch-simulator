class SignUp {
    constructor (database) {
        this.dependency = database
    }

    saveUser = async (user) => {
        try {
            return await this.dependency.signUser(user)
        } catch (e) {
            console.error(e)
            const message = e.message || e
            return { success: false, message, error: e.code || e }
        }
    }
}

module.exports = SignUp