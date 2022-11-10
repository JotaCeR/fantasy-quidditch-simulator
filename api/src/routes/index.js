const { Router } = require('express')
const router = Router()
const usersRoutes = require('./users')

router.use('/connect', (req, res) => {
    try {
        console.log("Hello World!")
        res.status(200).json({message: 'Success'})
    } catch (e) {
        const message = e.message || e
        console.error(e)
        res.status(400).send(message) 
    }
})

router.use('/users', usersRoutes)

module.exports = router