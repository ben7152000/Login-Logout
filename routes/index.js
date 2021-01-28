const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const login = require('./modules/login')
const register = require('./modules/register')

router.use('/', home)
router.use('/login', login)
router.use('/register', register)

module.exports = router
