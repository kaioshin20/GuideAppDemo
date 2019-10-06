const passport=require('passport')
const LocalStratergy=require('passport-local')
const FacebookStratergy=require('passport-facebook')
const GoogleStrategy=require('passport-google-oauth20')
const { connectdb }=require('./database/db')

passport.use(new LocalStratergy({
    usernameField: 'email'
},(username, password, done) => {
    connectdb('guideApp_demo')
        .then(db => db.collection('users').find({ email: username }))
        .then(user => user.toArray())
        .then((user) => {
            if(!user) {
                return done(new Error('username invalid'))
            }
            if(user[0].password != password) {
                return done(null, false)
            }
            done(null, user)
        })
        .catch(done)
}
)
);

passport.use( new FacebookStratergy({
    clientID: fid,
    clientSecret: fsec,
    callbackURL: 'http://localhost:3000/authenticate/signin/facebook/callback',
    profileFields: ['emails', 'displayName', 'picture.type(large)']
},
(accessToken, refreshToken, profile, done) => {
    connectdb('guideApp_demo')
        .then(db => db.collection('users').find({ email: profile.emails[0].value }))
        .then(user => user.toArray())
        .then((user) => {
            if(user.length == 0) {
                let fbuser = {
                    email: profile.emails[0].value,
                    fbAccessToken: accessToken
                }
                connectdb('guideApp_demo')
                    .then(db => db.collection('users').insertOne(fbuser))
                    .then(fbuser => {
                        console.log(fbuser.ops)
                        done(null, fbuser.ops)
                    })
                    .catch(done)
            }
            else{
                done(null, user)
            }
        })
        .catch(done)
}))

passport.use(new GoogleStrategy({
    clientID: gid,
    clientSecret: gsec,
    callbackURL: "http://localhost:3000/authenticate/signin/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    connectdb('guideApp_demo')
        .then(db => db.collection('users').find({ email: profile.emails[0].value }))
        .then(user => user.toArray())
        .then((user) => {
            if(user.length == 0) {
                let guser = {
                    email: profile.emails[0].value,
                    gAccessToken: accessToken
                }
                connectdb('guideApp_demo')
                    .then(db => db.collection('users').insertOne(guser))
                    .then(guser => {
                        console.log(guser.ops)
                        return done(null, guser.ops)
                    })
                    .catch(done)
            }
            else{
                done(null, user)
            }
        })
        .catch(done)
  }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
  })
  
  module.exports = passport