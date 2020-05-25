const express = require("express");
const NewsletterController = require("../controller/newsletter");
const api = express.Router();

api.post("/suscribe-newsletter/:email", NewsletterController.suscribeEmail);

module.exports = api;
