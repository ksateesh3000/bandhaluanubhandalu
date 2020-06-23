var jwt = require("jsonwebtoken");
var dbConfig = require("./db.config");

function verifyToken(req, res, next) {
  try {
   const token = req.headers.authorization;
   console.log(req.headers.authorization, "----------")
    const decoded = jwt.verify(token, dbConfig.SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth Faild" });
  }
}
module.exports = verifyToken;
module.exports.logout = function(req, res, next) {
  try {
   const token = req.headers.authorization;

   // const decoded = jwt.verify(token, dbConfig.SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth Faild" });
  }
}