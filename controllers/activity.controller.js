// controllers/activity.controller.js
const { Activite } = require("../models");
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
