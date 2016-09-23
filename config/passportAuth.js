var User = require('./../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(passport) {

    // ===================== passport session setup ============================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
//============   Config Strategy ============================
    passport.use(new FacebookStrategy({
            clientID: '1782145448688363',
            clientSecret: '6a37261fa01df03d5c2889649fec6664',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            profileFields: ['id', 'name', 'email', 'picture']
        },
//============   callback ====================================
//    logic after facebook response with the user profile data
        function(req, accessToken, refreshToken, profile, done) {
          if (!profile.emails || !profile.emails.length)
              return done("no emails assciated with this account!");
          var find = {'data.oauth': profile.id };
          var update = {
                      $set: {
                          "profile.username" : profile.name.givenName,
                          "profile.email": profile.emails[0].value,
                          "picture": profile.photos[0].value,
                      },
                    };
          var options = {
                  'new': true,
                  upsert: true
              };
          User.findOneAndUpdate(find, update, options,
              function(err, user) {
                  done(err, user);
              }
          );
        }
    ));
};
