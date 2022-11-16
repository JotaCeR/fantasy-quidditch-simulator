const bcrypt = require('bcryptjs')

class Hash {
    constructor () {
        this.salt = null;
        this.hashed = null;
    }

    setHash = async (password) => {
        await this.setSalt()
        this.hashed = await bcrypt.hash(password, this.salt)
    }

    setSalt = async () => {
        this.salt = await bcrypt.genSalt(10)
    }
}

class Compare {
    constructor () {
        this.password = null;
        this.hash = null;
    }

    compare = async (password, hash) => {
        this.setPassword(password)
        this.setHash(hash)

        return await bcrypt.compare(this.password, this.hash)
    }

    setPassword = (password) => {
        this.password = password
    }

    setHash = (hash) => {
        this.hash = hash
    }
}

module.exports = { Hash, Compare }