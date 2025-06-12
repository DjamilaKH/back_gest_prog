const express = require("express");
const router = express.Router();
const { creerProjet } = require("../controllers/project.controller");
const { verifyToken, isAdminOrChef } = require("../middlewares/authJwt");

router.post("/", verifyToken, isAdminOrChef, creerProjet);

module.exports = router;
