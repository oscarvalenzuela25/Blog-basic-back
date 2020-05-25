const express = require("express");
const api = express.Router();

//Middleware
const md_auth = require("../middleware/authenticated");

//Controlador
const CourseController = require("../controller/course");

api.post("/add-course", [md_auth.ensureAuth], CourseController.addCourse);
api.get("/get-courses", CourseController.getCourses);
api.delete(
  "/delete-course/:id",
  [md_auth.ensureAuth],
  CourseController.deleteCourse
);
api.put(
  "/update-course/:id",
  [md_auth.ensureAuth],
  CourseController.updateCourse
);

module.exports = api;
