function isAuthenticated(req, res, next) {
    if (!req.session.authenticated) {
        res.redirect('/login');
        res.status(401);
        res.send({
            msg: 'You are not logged in'
        });
        return;
    }
    next();
}
module.exports = isAuthenticated;