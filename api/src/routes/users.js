const { Router } = require('express')
const router = Router()


router.post('/signup', (req, res) => {
    try {
        const { username, email, password } = req.body
        
        res.status(200).send("Ok!")
    } catch (e) {
        const message = e.message || e
        console.error(e)
        res.status(400).send(message)
    }
})

module.exports = router