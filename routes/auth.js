module.exports = function(app, passport) {
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/'
        }));

    app.get('/profile', function(req, res) {
        res.json(req.user);
    });

}
