// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models"); // Import des modèles Sequelize
const userRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes"); // <-- à ajouter
const roleRoutes = require("./routes/role.routes");       // <-- à ajouter
const activityRoutes = require("./routes/activites.routes");
const tacheRoutes = require("./routes/tache.routes");
const utilisateurRoutes = require('./routes/utilisateur.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (exemple de route par défaut)
app.get("/", (req, res) => {
  res.send("Bienvenue sur l’API gestion projet !");
});

// TODO: importer et utiliser tes routes ici, exemple :
// const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/projets", projectRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/activites", activityRoutes);
app.use("/api/taches", tacheRoutes);
app.use('/api', utilisateurRoutes);

// Connexion à la base de données
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de données synchronisée.");
    // Lancer le serveur après connexion DB
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de synchronisation DB :", err);
  });
