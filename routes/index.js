const express = require('express')
const router = express.Router()

const control = require('./modules/control')

router.use('/', control)

module.exports = router
