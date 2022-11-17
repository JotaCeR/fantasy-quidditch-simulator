const { Router } = require('express')
const router = Router()
const usersPresenters = require('../presenters/users');
const usersMiddlewares = require('../middlewares/users');

router.post('/signup', (req, res) => {
    res.status(200).json({})
})

module.exports = router