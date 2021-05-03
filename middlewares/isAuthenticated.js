function isAuthenticated(req, res, next) {
    if (!req.session.authenticated) {
        res.redirect(307, '/login');
        return;
    }
    next();
}
module.exports = isAuthenticated;