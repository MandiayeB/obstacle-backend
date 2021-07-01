function allowHeaders(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

module.exports = allowHeaders;