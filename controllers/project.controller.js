const { v4: uuidv4 } = require("uuid");
const db = require("../models"); // <== ajouté ici
const { Projet } = db;

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

exports.getAllProjets = async (req, res) => {
  try {
    const projets = await Projet.findAll(); // directement Projet ici
    res.status(200).json(projets);
  } catch (error) {
    console.error("Erreur récupération projets :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
exports.getProjetById = async (req, res) => {
  try {
    const { id } = req.params;
    const projet = await Projet.findByPk(id);
    if (!projet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    res.status(200).json(projet);
  } catch (error) {
    console.error("Erreur récupération projet :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
exports.updateProjet = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Projet.update(req.body, {
      where: { id }
    });

    if (updated === 0) {
      return res.status(404).json({ message: "Projet non trouvé." });
    }

    const projetUpdated = await Projet.findByPk(id);
    res.status(200).json(projetUpdated);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
