const { Router } = require('express')
const router = Router()
const usersPresenters = require('../presenters/users');

router.post('/signup', usersPresenters.signUp.createUser)

module.exports = router