module.exports = (sequelize, DataTypes) => {
  const Projet = sequelize.define("Projet", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    titre: DataTypes.STRING,
    description: DataTypes.STRING,
    direction: DataTypes.STRING,
    budget: DataTypes.FLOAT,
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE,
    statut: DataTypes.STRING,
    chefProjetId: DataTypes.STRING,
  });

  Projet.associate = (models) => {
    Projet.hasMany(models.Utilisateur, {
      foreignKey: "projetId",
      as: "membres",
    });

    Projet.hasMany(models.Activite, {
      foreignKey: "projetId",
      as: "activites",
    });
  };

  return Projet;
};
