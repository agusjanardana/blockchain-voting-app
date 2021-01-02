const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // User.findById(id, function (err, user) { untuk cek di db
    done(null, user);
    // });
});


passport.use(new GoogleStrategy({
    clientID: "735820590312-qpvtm7ajfahi5pge4k699oli9r4s0gpi.apps.googleusercontent.com",
    clientSecret: "ynLXkzbyBzrKp9tt-X4Z_Ohz",
    callbackURL: "http://localhost:3007/admin/google/callback"
},
    function (accessToken, refreshToken, profile, done) {

        // User.findOrCreate({ googleId: profile.id }, function (err, user) { untuk melihat di db ini
        return done(null, profile);
        // });
    }
));
passport.use(new GoogleStrategy({
    clientID: "951427217505-jluqul4vr760eh8v0kur16260rft7u0u.apps.googleusercontent.com",
    clientSecret: "86jl8_3SqlFTItJUDDUWb5pn",
    callbackURL: "http://localhost:3007/api/v1/voting/voter/login/callback"
},
    function (accessToken, refreshToken, profile, done) {

        // User.findOrCreate({ googleId: profile.id }, function (err, user) { untuk melihat di db ini
        return done(null, profile);
        // });
    }
));