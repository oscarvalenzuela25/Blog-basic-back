const Post = require("../models/post");

exports.addPost = (req, res) => {
  const body = req.body;
  const post = new Post(body);
  post.save((error, postStored) => {
    if (error) {
      res.status(500).send({ code: 500, mensaje: "Error del Servidor", error });
    } else {
      if (!postStored) {
        res
          .status(404)
          .send({ code: 404, mensaje: "El post no se pudo crear" });
      } else {
        res
          .status(200)
          .send({ code: 200, mensaje: "Post creado satisfactoriamente" });
      }
    }
  });
};

exports.getPosts = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const option = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Post.paginate({}, option, (error, postsStored) => {
    if (error) {
      res.status(500).send({ code: 500, mensaje: "Error del Servidor", error });
    } else {
      if (!postsStored) {
        res.status(404).send({ code: 404, mensaje: "No se encontraron posts" });
      } else {
        res.status(200).send({ code: 200, posts: postsStored });
      }
    }
  });
};

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Post.findByIdAndUpdate({ _id: id }, data, (error, postUpdated) => {
    if (error) {
      res.status(500).send({ code: 500, mensaje: "Error del Servidor", error });
    } else {
      if (!postUpdated) {
        res.status(404).send({
          code: 404,
          mensaje: "No se encontro el post asociado a esa ID",
        });
      } else {
        res
          .status(200)
          .send({ code: 200, mensaje: "Post actualizado correctamente" });
      }
    }
  });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;

  Post.findByIdAndRemove({ _id: id }, (error, postDeleted) => {
    if (error) {
      res.status(500).send({ code: 500, mensaje: "Error en el servidor" });
    } else {
      if (!postDeleted) {
        res.status(404).send({
          code: 404,
          mensaje: "No se encontro post asociado a ese ID",
        });
      } else {
        res
          .status(200)
          .send({ code: 200, mensaje: "Post Eliminado Correctamente" });
      }
    }
  });
};

exports.getPost = (req, res) => {
  const { url } = req.params;

  Post.findOne({ url }, (error, postSearched) => {
    if (error) {
      res.status(500).send({ code: 500, mensaje: "Error del servidor", error });
    } else {
      if (!postSearched) {
        res
          .status(404)
          .send({ code: 404, mensaje: "No se encontro el post con esa URL" });
      } else {
        res.status(200).send({ code: 200, post: postSearched });
      }
    }
  });
};
