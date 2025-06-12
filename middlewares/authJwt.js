const jwt = require("jsonwebtoken");
const db = require("../models");
const Utilisateur = db.Utilisateur;
const Role = db.Role;

// ✅ Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "Aucun token fourni !" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Supprimer "Bearer "
  }

  jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY", async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token invalide ou expiré." });
    }

    req.utilisateurId = decoded.id;
    req.utilisateurRole = decoded.roleId;
    next();
  });
};

// ✅ Middleware pour vérifier si l'utilisateur est admin ou chef
const isAdminOrChef = async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.utilisateurRole);

    if (!role) {
      return res.status(403).send({ message: "Rôle introuvable." });
    }

    if (role.nom === "admin" || role.nom === "chef") {
      next();
    } else {
      return res.status(403).send({
        message: "Accès réservé aux administrateurs ou chefs de projet.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Erreur serveur lors de la vérification du rôle.",
    });
  }
};

// ✅ Exporter les middlewares
module.exports = {
  verifyToken,
  isAdminOrChef,
};
