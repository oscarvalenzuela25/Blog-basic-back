const jwt = require("jwt-simple");
const moment = require("moment");

const secretKey = "oskar8232003";

exports.createAccesToken = user => {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment()
      .add(3, "hours")
      .unix()
  };
  return jwt.encode(payload, secretKey);
};

exports.refreshToken = user => {
  const payload = {
    id: user._id,
    exp: moment()
      .add(3, "hours")
      .unix()
  };

  return jwt.encode(payload, secretKey);
};

exports.decodeToken = token => {
  return jwt.decode(token, secretKey);
};
