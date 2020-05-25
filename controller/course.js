const Course = require("../models/course");

exports.addCourse = (req, res) => {
  const body = req.body;
  const course = new Course(body);
  course.order = 500;

  course.save((err, courseStored) => {
    if (err) {
      res
        .status(400)
        .send({ code: 400, mensaje: "El curso que estas creando ya existe" });
    } else {
      if (!courseStored) {
        res
          .status(400)
          .send({ code: 400, mensaje: "No se ha podido crear el curso" });
      } else {
        res
          .status(200)
          .send({ code: 200, mensaje: "Curso creado correctamente" });
      }
    }
  });
};

exports.getCourses = (req, res) => {
  //let test = Course.find().sort({ order: "desc" });
  Course.find()
    .sort({ order: "asc" })
    .exec((error, courses) => {
      if (error) {
        res.status(500).send({ code: 500, mensaje: "Error del servidor" });
      } else {
        if (!courses) {
          res
            .status(404)
            .send({ code: 404, mensaje: "No se encontraron cursos" });
        } else {
          res.status(200).send({ code: 200, cursos: courses });
        }
      }
    });
};

exports.deleteCourse = (req, res) => {
  const { id } = req.params;

  Course.findOneAndRemove({ _id: id }, (error, courseDeleted) => {
    if (error) {
      res.status(500).send({ code: 500, mensaje: "Error del servidor" });
    } else {
      if (!courseDeleted) {
        res.status(404).send({ code: 404, mensaje: "No se encontro el curso" });
      } else {
        res
          .status(200)
          .send({ code: 200, mensaje: "Curso borrado satisfactoriamente" });
      }
    }
  });
};

exports.updateCourse = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  Course.findByIdAndUpdate(id, body, (error, courseUpdated) => {
    if (error) {
      res.status(500).send({ code: 500, mensaje: "Mensaje del servidor" });
    } else {
      if (!courseUpdated) {
        res.status(404).send({ code: 404, mensaje: "Curso no encontrado" });
      } else {
        res
          .status(200)
          .send({ code: 200, mensaje: "Curso actualizado correctamente" });
      }
    }
  });
};
