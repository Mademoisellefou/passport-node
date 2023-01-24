

import  express from  'express'
const  app = express()
import  passport from  'passport'
import  flash from  'express-flash'
import  session from  'express-session'
import  methodOverride from  'method-override'
import  initializePassport from './passport-config.js'
import  authentication  from './authentication/index.js'
initializePassport(
    passport
)


app.set('view-engine', "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(authentication)




app.listen(3000)