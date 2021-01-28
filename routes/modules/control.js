const express = require('express')
const router = express.Router()
const passport = require('passport')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { check, validationResult } = require('express-validator')

const Users = require('../../models/users.json').results

const initializePassport = require('../../config/passport')
initializePassport(
  passport,
  firstName => Users.find(user => user.firstName === firstName),
  email => Users.find(user => user.email === email)
)

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

router.use(flash())
router.use(passport.initialize())
router.use(passport.session())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(methodOverride('_method'))

// Index
router.get('/', checkAuthenticated, (req, res) => res.render('index', { firstName: req.user.firstName }))

// Login
router.get('/login', checkNotAuthenticated, (req, res) => res.render('login'))

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

// Register
router.get('/register', checkNotAuthenticated, (req, res) => res.render('register'))

router.post('/register', [
  check('firstName')
    .matches(/.+/)
    .withMessage('Please text your first name'),
  check('email')
    .matches(/.+@.+\..+/)
    .withMessage('Please text your email'),
  check('password')
    .matches(/.{8,}/)
    .withMessage('Please text password at least 8 letters')
], checkNotAuthenticated, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('register', {
      errorMessages: errors.array()
    })
  }
  try {
    await Users.push({
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

// Logout
router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

function checkNotAuthenticated (req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/')
  next()
}

module.exports = router
