//FS es File System, viene integrado, es solo usarlo
//FS sirve para verificar archivos dentro de node, se puede ocupar para ver si existe un archivo con una ruta especifica
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");

exports.signUp = (req, res) => {
  const user = new User();
  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ mensaje: "Las Passwords son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ mensaje: "Las passwords no son iguales" });
    } else {
      bcrypt.hash(password, null, null, function (error, hash) {
        if (error) {
          res.status(500).send({ mensaje: "Error al encriptar la contraseña" });
        } else {
          user.password = hash;
          user.save((error, userStored) => {
            if (error) {
              res.status(500).send({ mensaje: error });
            } else {
              if (!userStored) {
                res.status(404).send({ mensaje: "Error al crear el usuario" });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
};

exports.signIn = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  User.findOne({ email }, (error, userStored) => {
    if (error) {
      res.status(500).send({ mensaje: "Error del servidor" });
    } else {
      if (!userStored) {
        res.status(404).send({ mensaje: "El usuario no existe" });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
          } else {
            if (!check) {
              res.status(404).send({ mensaje: "La password es incorrecta" });
            } else {
              if (!userStored.active) {
                res
                  .status(200)
                  .send({ code: 200, mensaje: "El usuario no se ha activado" });
              } else {
                res.status(200).send({
                  accessToken: jwt.createAccesToken(userStored),
                  refreshToken: jwt.refreshToken(userStored),
                });
              }
            }
          }
        });
      }
    }
  });
};

exports.getUsers = async (req, res) => {
  User.find().then((users) => {
    if (!users) {
      res.status(404).send({ mensaje: "No se ha encontrado ningun usuario" });
    } else {
      res.status(200).send({ users });
    }
  });
};

exports.getUsersActive = async (req, res) => {
  const query = req.query;

  User.find({ active: query.active }).then((users) => {
    if (!users) {
      res.status(404).send({ mensaje: "No se ha encontrado ningun usuario" });
    } else {
      res.status(200).send({ users });
    }
  });
};

exports.uploadAvatar = (req, res) => {
  const params = req.params;

  User.findById({ _id: params.id }, (error, userData) => {
    if (error) {
      res.status(500).send({ mensaje: "Ha dado un error en el servidor" });
    } else {
      if (!userData) {
        res
          .status(404)
          .send({ mensaje: "No se ha encontrado usuario con esa ID" });
      } else {
        let user = userData;
        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("\\");
          let fileName = fileSplit[2];

          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpg") {
            res
              .status(400)
              .send({ mensaje: "La extension de la imagen no es valida" });
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (error, userResult) => {
                if (error) {
                  res.status(500).send({
                    mensaje:
                      "Hubo un error al actualizar por parte del servidor",
                  });
                } else {
                  if (!userResult) {
                    res
                      .status(404)
                      .send({ mensaje: "No se ha encontrado ningun usuario" });
                  } else {
                    res.status(200).send({ user: userResult });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
};

exports.getAvatar = (req, res) => {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;
  //exist verifica si existe un archivo ubicado en la ruta que se le entrega
  fs.exists(filePath, (exist) => {
    if (!exist) {
      res
        .status(404)
        .send({ mensaje: "No se encontro imagen asociada al avatar" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};

exports.updateUser = async (req, res) => {
  let userData = req.body;
  userData.email = req.body.email.toLowerCase();
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, null, null, (error, hash) => {
      if (error) {
        res.status(500).send({ mensaje: "Error al encriptar la contraseña" });
      } else {
        userData.password = hash;
      }
    });
  }

  User.findByIdAndUpdate({ _id: params.id }, userData, (error, userUpdate) => {
    if (error) {
      res.status(500).send({ mensaje: "Hubo un error en el servidor" });
    } else {
      if (!userUpdate) {
        res
          .status(404)
          .send({ mensaje: "No se encontro usuario asociado a esa ID" });
      } else {
        res.status(200).send({ mensaje: "Usuario actualizado correctamente" });
      }
    }
  });
};

exports.activateUser = (req, res) => {
  const id = req.params.id;
  const { active } = req.body;

  User.findByIdAndUpdate(id, { active }, (error, userStored) => {
    if (error) {
      res.status(500).send({ mensaje: "Error del servidor" });
    } else {
      if (!userStored) {
        res.status(404).send({ mensaje: "No se encontro ese usuarios" });
      } else {
        if (active === true) {
          res.status(200).send({ mensaje: "Usuario activado correctamente" });
        } else {
          res
            .status(200)
            .send({ mensaje: "Usuario desactivado correctamente" });
        }
      }
    }
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove({ _id: id }, (error, userDelete) => {
    if (error) {
      res.status(500).send({ mensaje: "Error en el servidor" });
    } else {
      if (!userDelete) {
        res
          .status(404)
          .send({ mensaje: "No se encontro a la persona con ese ID" });
      } else {
        res
          .status(200)
          .send({ mensaje: "Usuario eliminado satisfactoriamente" });
      }
    }
  });
};

exports.signUpAdmin = (req, res, next) => {
  const user = new User();

  const { name, lastname, email, role, password } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = role;
  user.active = true;

  if (!email) {
    res.status(500).send({ mensaje: "El email es obligatorio" });
    return null;
  }

  if (!password) {
    res.status(500).send({ mensaje: "La password es obligatoria" });
  } else {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al encriptar la password" });
      } else {
        user.password = hash;

        user.save((error, userStored) => {
          if (error) {
            res.status(500).send({ mensaje: "Error en el servidor" });
          } else {
            res.status(200).send({
              mensaje: `El usuario ${userStored.name} ha sido creado`,
            });
          }
        });
      }
    });
  }
};
