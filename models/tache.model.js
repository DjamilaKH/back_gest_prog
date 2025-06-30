module.exports = (sequelize, DataTypes) => {
  const Tache = sequelize.define("Tache", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en attente",
    },
  });

  Tache.associate = (models) => {
    Tache.belongsTo(models.Activite, {
      foreignKey: "activiteId",
      as: "activite",
    });

    Tache.belongsTo(models.Utilisateur, {
      foreignKey: "membreId",
      as: "membre",
    });
  };

  return Tache;
};
