const availableOrigins = [
    'http://localhost:3000',
    'https://real-server.com',
];

function allowOrigin(req, res, next) {
    const referer = req.headers.referer ? req.headers.referer.replace(/\/$/, '') : null;
    console.log(referer);
    if (availableOrigins.indexOf(referer) > -1) {
        res.header("Access-Control-Allow-Origin", referer);
    }
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    next();
}

module.exports = allowOrigin;