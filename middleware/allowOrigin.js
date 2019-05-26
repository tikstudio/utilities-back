function allowOrigin(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization");
  res.header("Access-Control-Allow-Headers", "*");
  next();
}

module.exports = allowOrigin;
