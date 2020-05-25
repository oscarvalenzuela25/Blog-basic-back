const jwt = require("../services/jwt");
const moment = require("moment");
const User = require("../models/user");

function willExpireToken(token) {
  const { exp } = jwt.decodeToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }
  return false;
}

exports.refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;
  const isTokenExpired = willExpireToken(refreshToken);

  if (isTokenExpired) {
    res.status(404).send({ mensaje: "El refresh token ha expirado " });
  } else {
    const { id } = jwt.decodeToken(refreshToken);
    User.findOne({ _id: id }, (error, userStored) => {
      if (error) {
        res.status(500).send({ mensaje: "Error del servidor" });
      } else {
        if (!userStored) {
          res
            .status(404)
            .send({ mensaje: "No se encontro un usuario con ese ID" });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccesToken(userStored),
            refreshToken: refreshToken
          });
        }
      }
    });
  }
};
