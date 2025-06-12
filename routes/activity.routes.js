const express = require("express");
const router = express.Router();
const { creerActivite } = require("../controllers/activity.controller");
const { verifyToken, isAdminOrChef } = require("../middlewares/authJwt");

router.post("/", verifyToken, isAdminOrChef, creerActivite);

module.exports = router;
