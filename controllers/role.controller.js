const { Role } = require("../models");
const { v4: uuidv4 } = require("uuid");

// Créer un rôle
exports.creerRole = async (req, res) => {
  try {
    const { nom } = req.body;

    const role = await Role.create({
      id: uuidv4(),
      nom,
    });

    res.status(201).json(role);
  } catch (error) {
    console.error("Erreur création rôle :", error);
    res.status(500).json({ message: "Erreur lors de la création du rôle." });
  }
};

// Obtenir tous les rôles
exports.listerRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Erreur récupération rôles :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des rôles." });
  }
};
