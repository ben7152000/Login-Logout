const LocalStrategy = require('passport-local').Strategy

function initialize (passport, getUserFirstName, getUserEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserEmail(email)
    if (user === null || user === undefined) return done(null, false, { message: 'No user with that email' })

    try {
      if (await password === user.password) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.firstName))
  passport.deserializeUser((firstName, done) => { return done(null, getUserFirstName(firstName)) })
}

module.exports = initialize
