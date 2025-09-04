// controllers/activity.controller.js
const { Activite, Projet, Utilisateur } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.creerActivite = async (req, res) => {
  try {
    const { titre, categorie, delai, projetId, responsableId } = req.body;

    const activite = await Activite.create({
      id: uuidv4(),
      titre,
      categorie,
      delai,
      projetId,
      responsableId,
    });

    res.status(201).json(activite);
  } catch (error) {
    console.error("Erreur lors de la création de l'activité :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'ajout de l'activité." });
  }
};
exports.getAllActivites = async (req, res) => {
  try {
    const activites = await Activite.findAll({
      include: [
        {
          model: Projet,
          as: "projet",
          attributes: ["id", "titre"], // récupère le titre du projet
        },
        {
          model: Utilisateur,
          as: "responsable",
          attributes: ["id", "nom", "prenom"], // récupère le nom complet
        }
      ]
    });
    res.json(activites);
  } catch (error) {
    console.error("Erreur lors du chargement des activités :", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des activités." });
  }
}
exports.updateActivite = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Activite.update(req.body, {
      where: { id }
    });

    if (updated) {
      const activite = await Activite.findByPk(id);
      res.json(activite);
    } else {
      res.status(404).json({ message: "Activité non trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'activité :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
exports.deleteActivite = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Activite.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: "Activité supprimée avec succès." });
    } else {
      res.status(404).json({ message: "Activité non trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
exports.getActiviteById = async (req, res) => {
  const id = req.params.id;
  try {
    const activite = await Activite.findOne({ where: { id } });
    if (!activite) {
      return res.status(404).json({ message: "Activité non trouvée" });
    }
    res.json(activite);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
