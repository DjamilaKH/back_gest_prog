const express = require("express");
const router = express.Router();
const { creerTache } = require("../controllers/tache.controller");
const { verifyToken, isAdminOrChef } = require("../middlewares/authJwt");

router.post("/", verifyToken, isAdminOrChef, creerTache);

module.exports = router;
