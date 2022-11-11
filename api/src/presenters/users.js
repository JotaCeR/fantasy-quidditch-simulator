const { Hash, Compare } = require('../services/users')

class UsersPresenter {
    constructor({ signUp }) {
        this.signUp = signUp
    }
}

class SignUp {
    constructor () {
        this.username = null;
        this.email = null;
        this.password = null;
        this.hash = new Hash();
    }

    createUser = async (req, res) => {
        try {
            this.setValues(req.body)
            await this.hash.setHash(this.password)
            res.status(200).json({ password: this.hash.hashed })
        } catch (e) {
            const message = e.message || e
            console.error(message)
            res.status(400).send(message)
        }
    }

    setValues = ({ username, email, password }) => {
        this.username = username
        this.email = email
        this.password = password
    }
}

const signUp = new SignUp()
module.exports = new UsersPresenter({ signUp })