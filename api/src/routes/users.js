const { Router } = require('express')
const router = Router()

router.post('/signup', (req, res) => {
    res.status(200).json({ message: 'User successfully created' })
})

module.exports = router