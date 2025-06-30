const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Connexion à la base de données PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

// ✅ Initialisation de l'objet `db` pour centraliser les modèles
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Chargement des modèles (avec injection de sequelize et DataTypes)
db.Role = require("./role.model")(sequelize, DataTypes);
db.Utilisateur = require("./utilisateur.model")(sequelize, DataTypes);
db.Projet = require("./projet.model")(sequelize, DataTypes);
db.Activite = require("./activite.model")(sequelize, DataTypes);
db.Tache = require("./tache.model")(sequelize, DataTypes);

// ✅ Appel des méthodes `associate` si elles existent (définir les relations)
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
