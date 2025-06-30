// models/utilisateur.model.js
module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define("Utilisateur", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    motDePasse: DataTypes.STRING,
  });

  Utilisateur.associate = (models) => {
    Utilisateur.belongsTo(models.Projet, {
      foreignKey: "projetId",
      as: "projet",
    });

    Utilisateur.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role",
    });

    Utilisateur.hasMany(models.Tache, {
      foreignKey: "membreId",
    });

    Utilisateur.hasMany(models.Activite, {
      foreignKey: "responsableId",
    });

  };

  return Utilisateur;
};
