const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importation des modèles avec injection de sequelize et DataTypes
db.Role = require("./role.model")(sequelize, DataTypes);
db.Utilisateur = require("./utilisateur.model")(sequelize, DataTypes);
db.Projet = require("./projet.model")(sequelize, DataTypes);
db.Activite = require("./activite.model")(sequelize, DataTypes);
db.Tache = require("./tache.model")(sequelize, DataTypes);

// Définir les associations si définies dans chaque modèle
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
