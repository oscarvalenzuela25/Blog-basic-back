const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const newsletterRoutes = require("./routes/newsletter");
const courseRoutes = require("./routes/course");
const postRoutes = require("./routes/post");
const { API_VERSION } = require("./config");
const cors = require("cors");

//Inicializando el servidor de Express
const app = express();

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors
app.use(cors());

//Configurar Header HTTP
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
*/

//Rutas
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);

//Configurando los Header HTTP
//...

module.exports = app;
