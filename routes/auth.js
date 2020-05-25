const express = require("express");
const api = express.Router();

//Controllers
const AuthController = require("../controller/auth");

//Routes
api.post("/refresh-access-token", AuthController.refreshAccessToken);

module.exports = api;
