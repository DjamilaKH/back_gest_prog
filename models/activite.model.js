module.exports = (sequelize, DataTypes) => {
  const Activite = sequelize.define("Activite", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categorie: {
      type: DataTypes.STRING,
    },
    delai: {
      type: DataTypes.DATE,
    },
  });

  Activite.associate = (models) => {
    Activite.belongsTo(models.Projet, {
      foreignKey: "projetId",
      as: "projet",
    });

    Activite.belongsTo(models.Utilisateur, {
      foreignKey: "responsableId",
      as: "responsable",
    });

    Activite.hasMany(models.Tache, {
      foreignKey: "activiteId",
      as: "taches",
    });
  };

  return Activite;
};
// exports.getAllActivites = async (req, res) => {
  // try {
  //   const activites = await Activite.findAll({
  //     include: [
  //       {
  //         model: Projet,
  //         as: "projet",
  //         attributes: ["id", "titre"], // récupère le titre du projet
  //       },
  //       {
  //         model: Utilisateur,
  //         as: "responsable",
  //         attributes: ["id", "nom", "prenom"], // récupère le nom complet
  //       }
  //     ]
  //   });
  //   res.json(activites);
  // } catch (error) {
  //   console.error("Erreur lors du chargement des activités :", error);
  //   res.status(500).json({ message: "Erreur serveur lors de la récupération des activités." });
  // }
