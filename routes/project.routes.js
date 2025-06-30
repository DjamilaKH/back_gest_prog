const express = require("express");
const router = express.Router();

// ✅ importer tout le contrôleur
const projetController = require("../controllers/project.controller");

// ✅ middlewares
const { verifyToken, isAdminOrChef } = require("../middlewares/authJwt");

// ✅ route pour créer un projet
router.post("/", verifyToken, isAdminOrChef, projetController.creerProjet);

// ✅ route pour récupérer tous les projets
router.get("/",verifyToken, isAdminOrChef, projetController.getAllProjets);
router.put("/:id", verifyToken, isAdminOrChef, projetController.updateProjet);

router.get("/:id", verifyToken, isAdminOrChef, projetController.getProjetById);

// router.delete("/projets/:id", projetController.deleteProjet);

module.exports = router;
