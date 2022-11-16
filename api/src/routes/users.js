const { Router } = require('express')
const router = Router()
const usersPresenters = require('../presenters/users');
const usersMiddlewares = require('../middlewares/users');

router.post('/signup', [usersMiddlewares.verify.passwordRule, usersMiddlewares.verify.emailRule], usersPresenters.signUp.createUser)

module.exports = router