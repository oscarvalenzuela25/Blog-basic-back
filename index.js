const mongoose = require("mongoose");
const app = require("./app");
const {
  PORT,
  IP_SERVER,
  DBPORT,
  DBNAME,
  USUARIO,
  PASSWORD,
} = require("./config");

//Conectar mongo
mongoose.Promise = Promise;

//Mongo en Local
/*
mongoose.connect(
  `mongodb://${IP_SERVER}:${DBPORT}/${DBNAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("La conexion a la BD es correcta");
      app.listen(PORT, () => {
        console.log("La aplicacion se ejecuta en el puerto " + PORT);
      });
    }
  }
);
*/

//Mongo en Atlas
mongoose.connect(
  `mongodb+srv://${USUARIO}:${PASSWORD}@myclusterpedidos-f9pud.gcp.mongodb.net/${DBNAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("La conexion a la BD es correcta");

      app.listen(PORT, () => {
        console.log("La aplicacion se ejecuta en el puerto " + PORT);
      });
    }
  }
);
