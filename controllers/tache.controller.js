// controllers/tache.controller.js
const { Tache } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.creerTache = async (req, res) => {
  try {
    const { titre, statut, activiteId, membreId } = req.body;

    const nouvelleTache = await Tache.create({
      id: uuidv4(),
      titre,
      statut,
      activiteId,
      membreId,
    });

    res.status(201).json(nouvelleTache);
  } catch (error) {
    console.error("Erreur lors de la création de la tâche :", error);
    res.status(500).json({
      message: "Erreur lors de la création de la tâche.",
      error: error.message,
    });
  }
};
