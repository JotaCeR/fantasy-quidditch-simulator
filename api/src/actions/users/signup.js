class SignUp {
    constructor(service) {
        this.dependency = service
    }

    activate = async (username, email, password) => {
        try {
            return await this.invokeService(username, email, password)
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { success: false, message, error: e.code || e }
        }
    }

    invokeService = async (username, email, password) => {
        return await this.dependency.serve(username, email, password)
    }
}

module.exports = SignUp