require("dotenv").config({ path: "variables.env" });

exports.API_VERSION = process.env.API_VERSION;
exports.IP_SERVER = process.env.IP_SERVER || "localhost";
exports.PORT = process.env.PORT || 5000;
exports.DBPORT = process.env.DBPORT || 27017;
exports.DBNAME = process.env.DBNAME;
exports.USUARIO = process.env.USUARIO;
exports.PASSWORD = process.env.PASSWORD;
