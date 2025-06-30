const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');

router.get('/utilisateurs', utilisateurController.getAllUtilisateurs);
router.delete('/utilisateurs/:id', utilisateurController.deleteUtilisateur);
router.put('/utilisateurs/:id', utilisateurController.updateUtilisateur);
router.get('/utilisateurs/:id', utilisateurController.getUtilisateurById); // pour pré-remplir

module.exports = router;
