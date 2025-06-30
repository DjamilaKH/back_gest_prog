const express = require("express");
const router = express.Router();
const tacheController = require("../controllers/tache.controller");
const { verifyToken, isAdminOrChef } = require("../middlewares/authJwt");

router.post("/", verifyToken, isAdminOrChef, tacheController.creerTache);
router.get('/', verifyToken, isAdminOrChef, tacheController.getAllTaches);
router.delete("/:id", verifyToken, isAdminOrChef, tacheController.supprimerTache);
router.put("/:id", verifyToken, isAdminOrChef, tacheController.modifierTache);
router.get('/:id', tacheController.getTacheById);

module.exports = router;
