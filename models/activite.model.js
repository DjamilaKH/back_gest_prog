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
    });

    Activite.belongsTo(models.Utilisateur, {
      foreignKey: "responsableId",
      as: "responsable",
    });

    Activite.hasMany(models.Tache, {
      foreignKey: "activiteId",
    });
  };

  return Activite;
};
