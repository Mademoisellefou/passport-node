import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import pool from './database.js'


function initialize(passport) {
  const getUserById = async (userId) => {
    const data = await pool.query('select * from tbuser where userId=?', [userId])
    return JSON.parse(JSON.stringify(data[0]));
  }
  const authenticateUser = async (email, password, done) => {
    const data = await pool.query('select * from tbuser where email like ?', [email])//getUserByEmail(email)
    const user = JSON.parse(JSON.stringify(data[0]));
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy.Strategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.userId))
  passport.deserializeUser(async (id, done) => {
    return done(null,await getUserById(id))
   })
}

export default initialize
