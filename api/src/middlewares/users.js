class Verify {
    passwordRule = (req, res, next) => {
        try {
            if (!req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)) {
                res.status(400).json({ message: 'Invalid password' })
            }

            next()
        } catch (e) {
            const message = e.message || e
            console.error(e)
            res.status(400).send(message)
        }
    }

    emailRule = (req, res, next) => {
        try {
            if (!req.body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                res.status(400).json({ message: 'Invalid email' })
            }

            next()
        } catch (e) {
            const message = e.message || e
            console.error(e)
            res.status(400).send(message)
        }
    }
}

module.exports = { verify: new Verify() }
