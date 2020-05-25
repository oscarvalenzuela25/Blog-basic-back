const Menu = require("../models/menu");

exports.addMenu = (req, res) => {
  const { title, url, order, active } = req.body;
  const menu = new Menu();
  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;

  menu.save((error, menuSaved) => {
    if (error) {
      res.status(500).send({ mensaje: "Error del servidor" });
    } else {
      if (!menuSaved) {
        res.status(404).send({ mensaje: "Error al crear el menu" });
      } else {
        res.status(200).send({ mensaje: "El menu fue creado correctamente" });
      }
    }
  });
};

exports.getMenus = (req, res) => {
  Menu.find()
    .sort({ order: "asc" })
    .exec((error, menusSearched) => {
      if (error) {
        res.status(500).send({ mensaje: "Error en el servidor" });
      } else {
        if (!menusSearched) {
          res.status(404).send({ mensaje: "No hay menus disponibles" });
        } else {
          res.status(200).send({ menus: menusSearched });
        }
      }
    });

  //Otra forma de hacerlo
  /*
  const query = Menu.find();
  query.sort("order").then((response) => {
    console.log(response);
  });
  */
};

exports.updateMenu = (req, res) => {
  let menuData = req.body;
  const params = req.params;

  Menu.findByIdAndUpdate({ _id: params.id }, menuData, (error, dataUpdate) => {
    if (error) {
      res.status(500).send({ mensaje: "Error en el servidor" });
    } else {
      if (!dataUpdate) {
        res.status(404).send({ mensaje: "El menu no se ha encontrado" });
      } else {
        res.status(200).send({ mensaje: "Menu actualizado correctamente" });
      }
    }
  });
};

exports.activateMenu = (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  Menu.findByIdAndUpdate(id, { active }, (error, menuUpdated) => {
    if (error) {
      res.status(500).send({ mensaje: "Error del servidor" });
    } else {
      if (!menuUpdated) {
        res.status(404).send({ mensaje: "No se ha encontrado el menu" });
      } else {
        if (active === true) {
          res.status(200).send({ mensaje: "Menu activado correctamente" });
        } else {
          res.status(200).send({ mensaje: "Menu desactivado correctamente" });
        }
      }
    }
  });
};

exports.deleteMenu = (req, res) => {
  const { id } = req.params;

  Menu.findByIdAndRemove(id, (error, menuDeleted) => {
    if (error) {
      res.status(200).send({ mensaje: "Ha ocurrido un error en el servidor" });
    } else {
      if (!menuDeleted) {
        res
          .status(404)
          .send({ mensaje: "No se ha encontrado el menu con esa id" });
      } else {
        res
          .status(200)
          .send({ mensaje: "El menu ha sido eliminado satisfactoriamente" });
      }
    }
  });
};
