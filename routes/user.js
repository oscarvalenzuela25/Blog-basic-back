const express = require("express");
const api = express.Router();
//Con la dependencia connect-multiparty nos sirve para crear un tipo de middleware el cual nos deja subir archivos
const multipart = require("connect-multiparty");

//Middleware
const md_auth = require("../middleware/authenticated");
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });

//Controllers
const UserController = require("../controller/user");

//Rutas
api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);
api.put(
  "/upload-avatar/:id",
  [md_auth.ensureAuth, md_upload_avatar],
  UserController.uploadAvatar
);
api.get("/get-avatar/:avatarName", UserController.getAvatar);
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
api.put(
  "/activate-user/:id",
  [md_auth.ensureAuth],
  UserController.activateUser
);
api.delete("/delete-user/:id", [md_auth.ensureAuth], UserController.deleteUser);
api.post("/sign-up-admin", UserController.signUpAdmin);
module.exports = api;
