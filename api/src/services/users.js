const bcrypt = require('bcryptjs')

class Hash {
    constructor () {
        // this.salt = this.setSalt()
        this.hashed = null;
    }

    setHash = async (password) => {
        const salt = await bcrypt.genSalt(10)
        this.hashed = await bcrypt.hash(password, salt)
    }

    // async setSalt() {
    //     return await bcrypt.genSalt(10)
    // }
}

class Compare {
    constructor () {
        this.password = null;
        this.hash = null;
    }

    async compare(password, hash) {
        this.setPassword(password)
        this.setHash(hash)

        return await bcrypt.compare(this.password, this.hash)
    }

    setPassword(password) {
        this.password = password
    }

    setHash(hash) {
        this.hash = hash
    }
}

module.exports = { Hash, Compare }