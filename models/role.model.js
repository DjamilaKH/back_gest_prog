module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Role.associate = (models) => {
    Role.hasMany(models.Utilisateur, {
      foreignKey: "roleId",
      as: "utilisateurs",
    });
  };

  return Role;
};
