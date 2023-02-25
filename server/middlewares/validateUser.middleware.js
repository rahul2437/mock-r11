const jwt = require("jsonwebtoken");

exports.validate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET, function (err, user) {
      if (err) {
        return res.status(403).json({ message: "Please Login" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Please Login" });
  }
};
