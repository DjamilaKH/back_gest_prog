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


exports.getAllTaches = async (req, res) => {
  try {
    const taches = await Tache.findAll();
    res.json(taches);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error });
  }
};
exports.supprimerTache = async (req, res) => {
  try {
    const id = req.params.id;
    const tache = await Tache.destroy({ where: { id } });
    if (tache) {
      res.status(200).json({ message: "Tâche supprimée avec succès." });
    } else {
      res.status(404).json({ message: "Tâche non trouvée." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.modifierTache = async (req, res) => {
  try {
    const id = req.params.id;
    const { titre, statut, activiteId, membreId } = req.body;

    const tache = await Tache.findByPk(id);
    if (!tache) {
      return res.status(404).json({ message: "Tâche non trouvée." });
    }

    tache.titre = titre ?? tache.titre;
    tache.statut = statut ?? tache.statut;
    tache.activiteId = activiteId ?? tache.activiteId;
    tache.membreId = membreId ?? tache.membreId;

    await tache.save();

    res.status(200).json(tache);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTacheById = async (req, res) => {
  try {
    const id = req.params.id;
    const tache = await Tache.findByPk(id);
    if (!tache) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.json(tache);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

