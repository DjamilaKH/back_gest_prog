const { Projet } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.creerProjet = async (req, res) => {
  try {
    const {
      titre,
      description,
      direction,
      budget,
      dateDebut,
      dateFin,
      statut,
      chefProjetId,
    } = req.body;

    const projet = await Projet.create({
      id: uuidv4(),
      titre,
      description,
      direction,
      budget,
      dateDebut,
      dateFin,
      statut,
      chefProjetId,
    });

    res.status(201).json(projet);
  } catch (error) {
    console.error("Erreur création projet :", error);
    res.status(500).json({ message: "Erreur lors de la création du projet." });
  }
};
