function isAuthenticated(req, res, next) {
    if (!req.session.authenticated) {
        res.status(307);
        return;
    }
    next();
}
module.exports = isAuthenticated;