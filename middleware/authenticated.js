const jwt = require("jwt-simple");
const moment = require("moment");

const secretKey = "oskar8232003";

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ mensaje: "La peticion no tiene cabecera de autentificacion" });
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    var payload = jwt.decode(token, secretKey);
    if (payload.exp <= moment().unix()) {
      return res.status(404).send({ mensaje: "El token a expirado" });
    }
  } catch (error) {
    //console.log(error, "Hay un error en el try/catch");
    return res.status(404).send({ mensaje: "Token invalido" });
  }

  req.user = payload;
  next();
};
