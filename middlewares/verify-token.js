const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "Um token precisa ser passado na requisição." });
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: "Token Inválido" });
  }
  return next();
};

module.exports = verifyToken;
