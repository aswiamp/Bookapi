const express = require("express");
const purchaseController = require("../controllers/purhaseController");

const Router = express.Router();

Router.route("/:id")
    .get(purchaseController.checkAvailability)
    .post(purchaseController.purchaseBook);
Router.route("/").get(purchaseController.purchaseReport);


module.exports = Router;
