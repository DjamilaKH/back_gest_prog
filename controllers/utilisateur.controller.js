const db = require('../models');

exports.getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await db.Utilisateur.findAll({
      include: [
        { model: db.Role, as: 'role', attributes: ['nom'] },
  { model: db.Projet, as: 'projet', attributes: ['titre'] }       ]
    });
    res.status(200).json(utilisateurs);
  } catch (error) {
    console.error('Erreur récupération utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.deleteUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Utilisateur.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé." });
    }
  } catch (error) {
    console.error("Erreur suppression utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
exports.updateUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Utilisateur.update(req.body, {
      where: { id }
    });

    if (updated) {
      const utilisateur = await db.Utilisateur.findByPk(id, {
        include: ['role', 'projet']
      });
      res.status(200).json(utilisateur);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé." });
    }
  } catch (error) {
    console.error("Erreur mise à jour utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await db.Utilisateur.findByPk(req.params.id, {
      include: ['role', 'projet']
    });

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};
