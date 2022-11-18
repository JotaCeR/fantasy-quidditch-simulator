const { Router } = require('express')
const router = Router()
const usersPresenters = require('../presenters/users');
const usersMiddlewares = require('../middlewares/users');

router.post('/signup', (req, res) => {
    res.status(200).json({ message: 'User successfully created' })
})

module.exports = router