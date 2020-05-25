const express = require("express");
const api = express.Router();

//Controllers
const MenuController = require("../controller/menu");

//Middleware
const md_auth = require("../middleware/authenticated");

api.post("/add-menu", [md_auth.ensureAuth], MenuController.addMenu);
api.get("/get-menus", MenuController.getMenus);
api.put("/update-menu/:id", [md_auth.ensureAuth], MenuController.updateMenu);
api.put(
  "/activate-menu/:id",
  [md_auth.ensureAuth],
  MenuController.activateMenu
);
api.delete("/delete-menu/:id", [md_auth.ensureAuth], MenuController.deleteMenu);
module.exports = api;
