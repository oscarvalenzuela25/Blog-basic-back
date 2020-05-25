const NewsLetterSchema = require("../models/newsletter");

exports.suscribeEmail = (req, res) => {
  let { email } = req.params;
  const newsletter = new NewsLetterSchema();

  if (!email) {
    res.status(404).send({ mensaje: "El email es obligatorio", code: 404 });
  } else {
    newsletter.email = email.toLowerCase();
    newsletter.save((error, newsletterStored) => {
      if (error) {
        res
          .status(500)
          .send({ mensaje: "El Email ya existe en el sistema", code: 500 });
      } else {
        if (!newsletterStored) {
          res.status(404).send({
            code: 404,
            mensaje: "Error al registrar en la newsletter",
          });
        } else {
          res
            .status(200)
            .send({ code: 200, mensaje: "Email registrado correctamente" });
        }
      }
    });
  }
};
