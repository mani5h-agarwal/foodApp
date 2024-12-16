const JWT = require("jsonwebtoken");

const secret = "N0_$3cr3t";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
  };
  return JWT.sign(payload, secret);
}


function verifyToken(token) {
  return JWT.verify(token, secret);
}

module.exports = {
  createTokenForUser,
  verifyToken,
};