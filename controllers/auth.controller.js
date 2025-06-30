// controllers/auth.controller.js
const db = require("../models");
const Utilisateur = db.Utilisateur;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.signup = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      userName,
      email,
      tel,
      motDePasse,
      projetId,
      roleId
    } = req.body;

    const utilisateurExistant = await Utilisateur.findOne({ where: { email } });
    if (utilisateurExistant) {
      return res.status(400).send({ message: "Cet email est déjà utilisé." });
    }

    const hash = await bcrypt.hash(motDePasse, 10);

    await Utilisateur.create({
      id: uuidv4(),
      nom,
      prenom,
      userName,
      email,
      tel,
      motDePasse: hash,
      projetId,
      roleId,
    });

    res.status(201).send({ message: "Inscription réussie !" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).send({ message: "Erreur lors de l'inscription." });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    console.log("Tentative de connexion :", email);

    const utilisateur = await Utilisateur.findOne({
      where: { email },
      include: [{ model: db.Role, as: 'role' }] // ✅ très important
    });

    if (!utilisateur) {
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseValide) {
      return res.status(401).send({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      {
        id: utilisateur.id,
        roleId: utilisateur.roleId,
        roleNom: utilisateur.role?.nom // ✅ le nom du rôle dans le token aussi
      },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "24h" }
    );

    res.status(200).send({
      message: "Connexion réussie",
      token,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        roleId: utilisateur.roleId,
        roleNom: utilisateur.role?.nom || '', // ✅ ceci est lu dans le frontend
        projetId: utilisateur.projetId,
      },
    });
  } catch (error) {
    console.error("Erreur exacte : ", error);
    res.status(500).send({ message: "Erreur lors de la connexion." });
  }
};


