function isAuthenticated(req, res, next) {
    if (!req.session.authenticated) {
        res.status(307).send("You need to log in before visiting this website");
        return;
    }
    next();
}
module.exports = isAuthenticated;