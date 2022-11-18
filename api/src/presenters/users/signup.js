class SignUp {
    present = ({ username, email, password, callback }) => {
        try {
            if (!username || !email || !password) {
                throw new Error('Required value(s) missing')
            }

            return callback({ username, email, password })
        } catch (e) {
            const message = e.message || e
            console.error(e)
            return { sucess: false, message, error: e.code || e }
        }
    }
}

module.exports = SignUp